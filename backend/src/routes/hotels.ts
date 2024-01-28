import express, {Request, Response} from 'express';
import Hotel from '../models/hotel';
import { BookingType, HotelSearchResponse, HotelType } from '../shared/types';
import { param, validationResult } from 'express-validator';
import Stripe from 'stripe';
import verifyToken from '../middleware/auth';

//initialize a new stripe connection:
const stripe = new Stripe(process.env.STRIPE_API_KEY as string);

const router = express.Router();

//API HOTEL ENDPOINTS:

router.get("/search", async (req: Request, res: Response) => {
    try {
        const query = constructSearchQuery(req.query);

        let sortOptions = {};
        switch (req.query.sortOption) {
          case "starRating":
            sortOptions = { starRating: -1 };
            break;
          case "pricePerNightAsc":
            sortOptions = { pricePerNight: 1 };
            break;
          case "pricePerNightDesc":
            sortOptions = { pricePerNight: -1 };
            break;
        }
        //page size:
        const pageSize = 5;
        const pageNumber = parseInt(req.query.page ? req.query.page.toString() : "1");

        const skip = (pageNumber - 1) * pageSize;

        const hotels = await Hotel.find(query).skip(skip).limit(pageSize);
        
        const total = await Hotel.countDocuments(query);

        const response: HotelSearchResponse = {
            data: hotels,
            pagination: {
                total,
                page: pageNumber,
                pages: Math.ceil(total/pageSize),
            },
        };

        res.json(response);
    } catch (error) {
        console.log("error", error);
        res.status(500).json({message: "Something went wrong"});
    }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    const hotels = await Hotel.find().sort("-lastUpdated");
    res.json(hotels);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Error fetching hotels" });
  }
});

const constructSearchQuery = (queryParams: any) => {
    let constructedQuery: any = {};
  
    if (queryParams.destination) {
      constructedQuery.$or = [
        { city: new RegExp(queryParams.destination, "i") },
        { country: new RegExp(queryParams.destination, "i") },
      ];
    }
  
    if (queryParams.adultCount) {
      constructedQuery.adultCount = {
        $gte: parseInt(queryParams.adultCount),
      };
    }
  
    if (queryParams.childCount) {
      constructedQuery.childCount = {
        $gte: parseInt(queryParams.childCount),
      };
    }
  
    if (queryParams.facilities) {
      constructedQuery.facilities = {
        $all: Array.isArray(queryParams.facilities)
          ? queryParams.facilities
          : [queryParams.facilities],
      };
    }
  
    if (queryParams.types) {
      constructedQuery.type = {
        $in: Array.isArray(queryParams.types)
          ? queryParams.types
          : [queryParams.types],
      };
    }
  
    if (queryParams.stars) {
      const starRatings = Array.isArray(queryParams.stars)
        ? queryParams.stars.map((star: string) => parseInt(star))
        : parseInt(queryParams.stars);
  
      constructedQuery.starRating = { $in: starRatings };
    }
  
    if (queryParams.maxPrice) {
      constructedQuery.pricePerNight = {
        $lte: parseInt(queryParams.maxPrice).toString(),
      };
    }
  
    return constructedQuery;
};
  
router.get(
  "/:id",
  [param("id").notEmpty().withMessage("Hotel ID is required")],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const id = req.params.id.toString();

    try {
      const hotel = await Hotel.findById(id);
      res.json(hotel);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error fetching hotel" });
    }
  }
);

//create stripe payment intent:
router.post("/:hotelId/bookings/payment-intent", verifyToken, 
  async (req: Request, res: Response) => {

    const { numberOfNights } = req.body;
    const hotelId = req.params.hotelId;

    const hotel = await Hotel.findById(hotelId);

    if(!hotel) {
      return res.status(400).json({ message: "Hotel not found" });
    }
      
    const totalCost = hotel.pricePerNight * numberOfNights;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalCost * 100,
      currency: "USD",
      description: "payment",
      customer:"cus_PS9jJXjGuHSBF5",
      shipping: {
        address: {
          city: "Phoenix",
          country: "USA",
          postal_code: "85035",
          state: "Arizona",
        },
        name: "Pragyan"
      },
      metadata: {
        hotelId,
        userId: req.userId,
      },
    });

    if(!paymentIntent.client_secret) {
      return res.status(500).json({ message: "Error creating payment intent" });
    };

    const response = {
      paymentIntentId: paymentIntent.id,
      clientSecret: paymentIntent.client_secret.toString(),
      totalCost,
    };

    res.send(response);
      
  }
);

//create room booking:
router.post("/:hotelId/bookings", verifyToken,
    async (req: Request, res: Response) => {
      try {
        const paymentIntentId = req.body.paymentIntentId;

        const paymentIntent = await stripe.paymentIntents.retrieve(
          paymentIntentId as string
        );

        if(!paymentIntent) {
          res.status(400).json({ message: "payment intent not found"});
        };

        if(
          paymentIntent.metadata.hotelId !== req.params.hotelId ||
          paymentIntent.metadata.userId !== req.userId
        ) {
            return res.status(400).json({ message: "payment intent mistmatch" });
        };

        if(paymentIntent.status !== "succeeded") {
          return res.status(400).json({ 
            message: `payment intent not succeeded. Status: ${paymentIntent.status}`
          });
        }

        const newBooking: BookingType = {
          ...req.body,
          userId: req.userId,
        };

        const hotel = await Hotel.findByIdAndUpdate(
          { _id: req.params.hotelId},
          { $addToSet:{bookings: newBooking}
          }
        );

        if(!hotel)
          return res.status(400).json({ message: "hotel not found" });
        
        await hotel.save();
        res.status(200).send();
          
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "something went wrong" });
      }
    }
);

export default router;