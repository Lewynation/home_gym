import { PrismaClient } from "@prisma/client";
// import orders from "./products_seed.ts";
// import subs from "./subscriptions_seed.ts";
interface Product {
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  short_description: string;
}

const orders: Product[] = [
  {
    name: "Fitbit Tracker Series 1",
    category: "wearable",
    price: 17500,
    image: "35ba06e71c4d190daae96ce5b41e2910.jpg",
    description:
      "Stay on top of your fitness goals with the Fitbit Tracker Series 1. This sleek wearable combines style with functionality, providing real-time health insights and activity tracking. Elevate your fitness journey effortlessly.",
    short_description: "Sleek Fitness Tracker",
  },
  {
    name: "Fitbit Tracker Series 2",
    category: "wearable",
    price: 25000,
    image: "75bb01aac8b40cfb19eda02bf94c1a5c.jpg",
    description:
      "Introducing the Fitbit Tracker Series 2, your perfect fitness companion. With advanced features and a stylish design, this wearable ensures you stay motivated and informed throughout your fitness routine. Embrace a healthier lifestyle with every step.",
    short_description: "Advanced Fitness Companion",
  },
  {
    name: "Nike SE 5.0",
    category: "wearable",
    price: 33000,
    image: "e4d63d44a2ff99593669890b5f9c93df.jpg",
    description:
      "Unleash the power of the Nike SE 5.0, a cutting-edge wearable designed for fitness enthusiasts. With superior performance and a touch of sporty elegance, this device is engineered to elevate your workouts and keep you at the top of your game.",
    short_description: "Sporty Wearable",
  },
  {
    name: "Rad Dots",
    category: "wearable",
    price: 15000,
    image: "756783e7de9ecf1906cb854e9e853d10.jpg",
    description:
      "Add a touch of vibrancy to your workout wardrobe with Rad Dots, the trendy wearable that fuses fashion with function. Whether you're hitting the gym or the streets, make a statement with this stylish and comfortable accessory.",
    short_description: "Stylish Fitness",
  },
  {
    name: "PRX Fitness Pro Smart Watch",
    category: "wearable",
    price: 15000,
    image: "e4f70c021dfbfdaf0a125b872ef81855.jpg",
    description:
      "Elevate your fitness routine with the PRX Fitness Pro Smart Watch. Packed with features like heart rate monitoring and workout tracking, this smartwatch is your personal fitness coach on your wrist, ensuring every move counts.",
    short_description: "Smart Fitness Coach",
  },
  {
    name: "Fitbit Series 1",
    category: "wearable",
    price: 13500,
    image: "efd3045da28f5abc7ea6cd0ef52adfa9.jpg",
    description:
      "Experience the next level of fitness tracking with the Fitbit Series 1. This affordable yet feature-packed wearable is perfect for beginners and seasoned fitness enthusiasts alike. Achieve your health goals with ease.",
    short_description: "Affordable Tracker",
  },
  {
    name: "Weight Plates",
    category: "gym",
    price: 7500,
    image: "weightplates.jpg",
    description:
      "Build strength and muscle with our high-quality Weight Plates. Crafted for durability and precision, these plates are essential for any serious weightlifting routine. Maximize your gains with every rep.",
    short_description: "Build Strength",
  },
  {
    name: "Barbell",
    category: "gym",
    price: 5000,
    image: "barbell.jpg",
    description:
      "The Barbell, a timeless classic in strength training. Perfect for a variety of exercises, this versatile piece of equipment is a must-have in any home or commercial gym. Unleash your inner strength with every lift.",
    short_description: "Timeless Strength",
  },
  {
    name: "Kettlebell",
    category: "gym",
    price: 3000,
    image: "kettlebel.jpg",
    description:
      "Sculpt and tone with our premium Kettlebell. Whether you're a beginner or a seasoned pro, this compact and efficient tool is designed for a full-body workout. Embrace the kettlebell revolution.",
    short_description: "Versatile Workout",
  },
  {
    name: "Hydrow Rower",
    category: "gym",
    price: 3000,
    image: "hydrorower.jpg",
    description:
      "Immerse yourself in the ultimate rowing experience with the Hydrow Rower. Designed for fluidity and comfort, this rowing machine offers a total-body workout that simulates the feel of rowing on water. Row your way to fitness.",
    short_description: "Immersive Rowing",
  },
  {
    name: "Punching Bag",
    category: "gym",
    price: 15000,
    image: "punchingbag.jpg",
    description:
      "Release stress and enhance your martial arts skills with our high-quality Punching Bag. Built for durability and impact absorption, this essential gym equipment is perfect for both beginners and seasoned fighters alike.",
    short_description: "Stress Release",
  },
  {
    name: "Resistance Bands",
    category: "gym",
    price: 15000,
    image: "resistancebands.jpg",
    description:
      "Take your workout to the next level with our versatile Resistance Bands. Ideal for strength training and flexibility exercises, these bands offer a full-body workout experience. Strengthen, tone, and achieve your fitness goals.",
    short_description: "Full-Body Workout",
  },
  {
    name: "Exercise Bike",
    category: "featured",
    price: 27500,
    image: "exercisebike.jpg",
    description:
      "Revolutionize your cardio routine with our state-of-the-art Exercise Bike. Designed for comfort and performance, this bike offers a smooth ride and customizable resistance levels. Get ready to pedal your way to fitness.",
    short_description: "Cardio Revolution",
  },
  {
    name: "Yoga Mat",
    category: "featured",
    price: 5000,
    image: "yogamat.jpg",
    description:
      "Enhance your yoga practice with our premium Yoga Mat. Crafted for comfort and durability, this non-slip mat provides the perfect foundation for your poses and stretches. Elevate your yoga experience.",
    short_description: "Comfortable Yoga",
  },
  {
    name: "Treadmill",
    category: "featured",
    price: 33000,
    image: "treadmill.jpg",
    description:
      "Bring the gym to your home with our high-performance Treadmill. Whether you're a seasoned runner or just starting your fitness journey, this treadmill offers a variety of workout programs and incline options. Run towards a healthier you.",
    short_description: "Home Running",
  },
  {
    name: "Rubber-Coated Kettlebell",
    category: "featured",
    price: 13000,
    image: "dac88aa9d9661fb1c908b750a006e986.jpg",
    description:
      "Experience the perfect blend of style and functionality with our Rubber-Coated Kettlebell. Designed for durability and versatility, this kettlebell is a must-have for any home gym. Sculpt and strengthen with confidence.",
    short_description: "Stylish Strength",
  },
  {
    name: "Bowflex PR3000",
    category: "featured",
    price: 55000,
    image: "pr3000.jpg",
    description:
      "Transform your home gym with the Bowflex PR3000. This versatile piece of equipment offers a wide range of exercises, ensuring a full-body workout. Take your fitness journey to the next level with the PR3000.",
    short_description: "Versatile Home Gym",
  },
  {
    name: "Bowflex PR6000",
    category: "featured",
    price: 63500,
    image: "c58c300f65604340f6a3d1dfd26f4179.jpg",
    description:
      "Experience unparalleled strength training with the Bowflex PR6000. Designed for maximum performance and versatility, this home gym system allows you to target every muscle group. Elevate your fitness routine with the PR6000.",
    short_description: "Total Body Workout",
  },
];

const subs = [
  {
    id: 1,
    name: "Master",
    price: 2000,
    duration: 30,
  },
  {
    id: 2,
    name: "Kiongoss",
    price: 5000,
    duration: 30,
  },
  {
    id: 3,
    name: "Bazu",
    price: 10000,
    duration: 30,
  },
];

export const trainers_seed = [
  {
    name: "Sarah Wanjiru",
    phone_number: "0722-789-1234",
    email: "sarahwanjiru@example.com",
    location: "Nyeri, Kenya",
    bio: "Passionate and dedicated swimming instructor with 5 years of experience. Specializing in children and adults.",
    services_offered: [
      "Swimming Lessons",
      "Water Safety Training",
      "Competitive Coaching",
    ],
    availability: "Tuesday, Thursday, Sunday, 3:00 PM - 7:00 PM",
    rates: "KES 1,500 per session",
    credentials: ["Certified Swim Instructor", "First Aid and CPR Certified"],
    experience: "5 years",
    reviews: [
      {
        client_name: "John Mwangi",
        review:
          "Sarah is an amazing instructor! My son learned to swim confidently within a few months.",
      },
      {
        client_name: "Jane Kamau",
        review:
          "Sarah's water safety training was invaluable. I feel much more prepared to keep my family safe around water.",
      },
    ],
  },
  {
    name: "Jane Doe",
    phone_number: "123-456-7890",
    email: "janedoe@example.com",
    location: "Nairobi, Kenya",
    bio: "Certified personal trainer with 5 years of experience specializing in strength training and weight loss.",
    services_offered: ["Personal Training", "Group Fitness"],
    availability: "Monday to Friday, 8:00 AM - 6:00 PM",
    rates: "KES 5,000 per hour",
    credentials: ["NASM Certified Personal Trainer"],
    experience: "5 years",
    reviews: [
      {
        client_name: "John Smith",
        review:
          "Jane is an amazing trainer! She helped me achieve my fitness goals.",
      },
      {
        client_name: "Emily Johnson",
        review: "Highly recommend Jane for anyone looking to get in shape.",
      },
    ],
  },
  {
    name: "Alice Johnson",
    phone_number: "555-123-4567",
    email: "alicejohnson@example.com",
    location: "Kisumu, Kenya",
    bio: "Certified yoga instructor passionate about helping clients find balance and strength through yoga practice.",
    services_offered: ["Yoga Classes", "Meditation Sessions"],
    availability: "Tuesday and Thursday evenings, Saturday mornings",
    rates: "KES 4,000 per hour",
    credentials: ["RYT-200 Yoga Alliance Certified"],
    experience: "6 years",
    reviews: [
      {
        client_name: "Emma Brown",
        review:
          "Alice's yoga classes are rejuvenating. I always leave feeling refreshed and relaxed.",
      },
      {
        client_name: "Michael Clark",
        review:
          "I appreciate Alice's attention to detail in correcting poses. She's helped me improve my practice.",
      },
    ],
  },
  {
    name: "John Smith",
    phone_number: "987-654-3210",
    email: "johnsmith@example.com",
    location: "Mombasa, Kenya",
    bio: "Experienced fitness coach specializing in HIIT and circuit training.",
    services_offered: ["Personal Training", "Online Coaching"],
    availability: "Flexible schedule, contact for availability",
    rates: "KES 6,000 per hour",
    credentials: ["ACE Certified Personal Trainer", "CrossFit Level 2 Trainer"],
    experience: "8 years",
    reviews: [
      {
        client_name: "Sarah Johnson",
        review:
          "John is an excellent trainer. He pushes you to your limits while keeping the workouts fun.",
      },
      {
        client_name: "David Williams",
        review:
          "I've seen significant improvements in my fitness level since training with John.",
      },
    ],
  },
  {
    name: "David Ngugi",
    phone_number: "123-789-4560",
    email: "davidngugi@example.com",
    location: "Eldoret, Kenya",
    bio: "Experienced athletics coach specializing in track and field events. Former national champion.",
    services_offered: ["Athletics Coaching", "Speed Training"],
    availability: "Monday to Saturday, 6:00 AM - 12:00 PM",
    rates: "KES 7,000 per hour",
    credentials: ["Former National Champion in Track and Field"],
    experience: "12 years",
    reviews: [
      {
        client_name: "Grace Muthoni",
        review:
          "David's training methods are effective. I've seen significant improvements in my sprint times.",
      },
      {
        client_name: "Peter Kipchoge",
        review:
          "Training with David has been a game-changer for me. His expertise is unmatched.",
      },
    ],
  },
  {
    name: "Sarah Wanjiru",
    phone_number: "0722-789-1234",
    email: "sarahwanjiru@example.com",
    location: "Nyeri, Kenya",
    bio: "Passionate and dedicated swimming instructor with 5 years of experience. Specializing in children and adults.",
    services_offered: [
      "Swimming Lessons",
      "Water Safety Training",
      "Competitive Coaching",
    ],
    availability: "Tuesday, Thursday, Sunday, 3:00 PM - 7:00 PM",
    rates: "KES 1,500 per session",
    credentials: ["Certified Swim Instructor", "First Aid and CPR Certified"],
    experience: "5 years",
    reviews: [
      {
        client_name: "John Mwangi",
        review:
          "Sarah is an amazing instructor! My son learned to swim confidently within a few months.",
      },
      {
        client_name: "Jane Kamau",
        review:
          "Sarah's water safety training was invaluable. I feel much more prepared to keep my family safe around water.",
      },
    ],
  },
  {
    name: "Juma Mohammed",
    phone_number: "0733-456-2198",
    email: "jumamohammed@example.com",
    location: "Malindi, Kenya",
    bio: "Skilled and experienced tour guide with a deep knowledge of Kenyan history and culture. Offering personalized tours for individuals and groups.",
    services_offered: ["Day Tours", "Safaris", "Cultural Experiences"],
    availability: "Monday to Saturday, 8:00 AM - 6:00 PM",
    rates: "KES 5,000 per person per day",
    credentials: ["Certified Tour Guide", "First Aid and CPR Certified"],
    experience: "8 years",
    reviews: [
      {
        client_name: "Alice Walker",
        review:
          "Juma is an amazing guide! He showed us all the hidden gems of Malindi and made our trip unforgettable.",
      },
      {
        client_name: "Michael Jackson",
        review:
          "Juma's safari was incredible! We saw all the Big Five and learned so much about Kenyan wildlife.",
      },
    ],
  },
  {
    name: "Aisha Ahmed",
    phone_number: "0700-123-4567",
    email: "aishahamed@example.com",
    location: "Kisumu, Kenya",
    bio: "Creative and talented graphic designer with a passion for branding and illustration. Offering a wide range of design services for businesses and individuals.",
    services_offered: ["Logo Design", "Branding", "Web Design", "Illustration"],
    availability: "Monday to Friday, 9:00 AM - 5:00 PM",
    rates: "KES 2,500 per hour",
    credentials: [
      "Bachelor of Arts in Graphic Design",
      "Member of the Kenya Graphic Designers Association",
    ],
    experience: "3 years",
    reviews: [
      {
        client_name: "John Doe",
        review:
          "Aisha is a fantastic designer! She created a beautiful and effective logo for my business.",
      },
      {
        client_name: "Jane Doe",
        review:
          "Aisha helped me redesign my website and it looks amazing! She is very creative and easy to work with.",
      },
    ],
  },
  {
    name: "Abdi Hassan",
    phone_number: "0711-987-4567",
    email: "abdihassan@example.com",
    location: "Mombasa, Kenya",
    bio: "Talented Swahili language tutor with over 10 years of experience. Offering personalized lessons for all levels.",
    services_offered: [
      "Swahili Language Lessons",
      "Conversational Swahili",
      "Business Swahili",
    ],
    availability: "Monday, Wednesday, Friday, 10:00 AM - 2:00 PM",
    rates: "KES 2,000 per hour",
    credentials: ["Master's Degree in Linguistics", "TESOL Certified"],
    experience: "10+ years",
    reviews: [
      {
        client_name: "Mary Smith",
        review:
          "Abdi is an excellent teacher! He made learning Swahili fun and engaging.",
      },
      {
        client_name: "David Jones",
        review:
          "Abdi helped me improve my business Swahili significantly. Now I feel confident communicating with my clients.",
      },
    ],
  },
];

const prisma = new PrismaClient();

async function main() {
  const subscriptionTiers = await prisma.subscriptionTier.createMany({
    data: subs.map((sub) => ({
      id: sub.id,
      name: sub.name,
      duration: sub.duration,
      price: sub.price,
    })),
  });
  const products = await prisma.product.createMany({
    data: orders.map((order) => ({
      name: order.name,
      shortDesc: order.short_description,
      description: order.description,
      image: order.image,
      category: order.category as any,
      price: order.price,
    })),
  });

  const trainersData = await prisma.trainer.createMany({
    data: trainers_seed.map((trainer) => ({
      name: trainer.name,
      phoneNumber: trainer.phone_number,
      email: trainer.email,
      location: trainer.location,
      bio: trainer.bio,
      servicesOffered: trainer.services_offered,
      availability: trainer.availability,
      rates: trainer.rates,
      credentials: trainer.credentials,
      experience: trainer.experience,
    })),
  });

  console.log({ products, subscriptionTiers, trainersData });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
