require('dotenv').config();
const mongoose = require('mongoose');
const Package = require('./models/Package');
const Offer = require('./models/Offer');
const User = require('./models/User');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    // Clear existing data
    await Package.deleteMany({});
    await Offer.deleteMany({});
    await User.deleteMany({});
    console.log('Cleared existing data');

    // Create sample packages
    const packages = [
      {
        title: 'Himalayan Trekking Adventure',
        description: 'Experience the majestic Himalayas with our expert guides. Trek through beautiful landscapes, visit remote villages, and witness breathtaking mountain views.',
        location: 'Himalayas, Nepal',
        type: 'Trekking',
        duration: 10,
        price: 1200,
        maxGroupSize: 12,
        difficulty: 'Challenging',
        rating: 4.8,
        reviewCount: 156,
        imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
        bestSeason: 'spring, autumn, winter',
        weather: 'cool, clear',
        highlights: [
          'Trek to Everest Base Camp',
          'Visit ancient Buddhist monasteries',
          'Experience local Sherpa culture',
          'Stunning mountain photography opportunities'
        ],
        included: [
          'Professional guide',
          'Accommodation in tea houses',
          'All meals during trek',
          'Trekking permits',
          'Porter service'
        ],
        excluded: [
          'International flights',
          'Travel insurance',
          'Personal expenses',
          'Tips for guides'
        ],
        isActive: true
      },
      {
        title: 'Scuba Diving in Maldives',
        description: 'Explore the underwater paradise of Maldives. Dive with manta rays, whale sharks, and discover vibrant coral reefs.',
        location: 'Maldives',
        type: 'Water Sports',
        duration: 7,
        price: 2500,
        maxGroupSize: 8,
        difficulty: 'Moderate',
        rating: 4.9,
        reviewCount: 203,
        imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19',
        bestSeason: 'winter',
        weather: 'sunny, warm',
        highlights: [
          'Multiple dive sites',
          'PADI certified instructors',
          'Luxury resort accommodation',
          'All diving equipment included'
        ],
        included: [
          'Accommodation',
          'All meals',
          'Diving equipment',
          'Boat transfers',
          'Airport transfers'
        ],
        excluded: [
          'Flights',
          'Dive certification course',
          'Alcohol',
          'Tips'
        ],
        isActive: true
      },
      {
        title: 'African Safari Experience',
        description: 'Witness the Big Five in their natural habitat. Experience the thrill of game drives and luxury camping under the African stars.',
        location: 'Serengeti, Tanzania',
        type: 'Wildlife',
        duration: 8,
        price: 3200,
        maxGroupSize: 10,
        difficulty: 'Easy',
        rating: 5.0,
        reviewCount: 89,
        imageUrl: 'https://images.unsplash.com/photo-1516426122078-c23e76319801',
        bestSeason: 'winter, summer',
        weather: 'sunny, warm',
        highlights: [
          'See the Big Five',
          'Luxury tented camps',
          'Professional wildlife photographers',
          'Witness the Great Migration'
        ],
        included: [
          'Luxury accommodation',
          'All meals',
          'Game drives',
          'Park fees',
          'Expert guides'
        ],
        excluded: [
          'International flights',
          'Visa fees',
          'Travel insurance',
          'Personal expenses'
        ],
        isActive: true
      },
      {
        title: 'Desert Camping in Rajasthan',
        description: 'Experience the magic of the Thar Desert. Camel rides, traditional Rajasthani culture, and nights under the stars.',
        location: 'Jaisalmer, India',
        type: 'Camping',
        duration: 5,
        price: 450,
        maxGroupSize: 15,
        difficulty: 'Easy',
        rating: 4.6,
        reviewCount: 127,
        imageUrl: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24',
        bestSeason: 'winter',
        weather: 'cool, pleasant',
        highlights: [
          'Camel safari',
          'Desert camping',
          'Traditional music and dance',
          'Visit ancient forts'
        ],
        included: [
          'Accommodation',
          'Meals',
          'Camel safari',
          'Cultural performances',
          'Local guide'
        ],
        excluded: [
          'Transport to Jaisalmer',
          'Personal expenses',
          'Tips'
        ],
        isActive: true
      },
      {
        title: 'Patagonia Mountain Climbing',
        description: 'Conquer the peaks of Patagonia. Technical climbing with experienced mountaineers in one of the world\'s most dramatic landscapes.',
        location: 'Patagonia, Argentina',
        type: 'Mountain Climbing',
        duration: 14,
        price: 4500,
        maxGroupSize: 6,
        difficulty: 'Expert',
        rating: 4.7,
        reviewCount: 45,
        imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
        bestSeason: 'summer',
        weather: 'cool, windy',
        highlights: [
          'Summit Fitz Roy',
          'Ice climbing',
          'Glacier trekking',
          'Small group experience'
        ],
        included: [
          'Mountain guides',
          'All climbing equipment',
          'Accommodation',
          'Meals',
          'Permits'
        ],
        excluded: [
          'Flights to Argentina',
          'Travel insurance',
          'Personal climbing gear',
          'Emergency evacuation'
        ],
        isActive: true
      },
      {
        title: 'Whitewater Rafting Adventure',
        description: 'Experience the thrill of Class IV rapids on the Ganges. Perfect for adventure enthusiasts looking for an adrenaline rush.',
        location: 'Rishikesh, India',
        type: 'Water Sports',
        duration: 3,
        price: 280,
        maxGroupSize: 20,
        difficulty: 'Moderate',
        rating: 4.5,
        reviewCount: 312,
        imageUrl: 'https://unsplash.com/photos/a-group-of-people-on-a-raft-in-a-river-WVDuKuz22ac',
        bestSeason: 'spring, summer, autumn',
        weather: 'moderate, pleasant',
        highlights: [
          'Class III & IV rapids',
          'Professional safety equipment',
          'Beach camping',
          'Bonfire nights'
        ],
        included: [
          'Rafting equipment',
          'Safety gear',
          'Camping',
          'Meals',
          'Certified guides'
        ],
        excluded: [
          'Transport to Rishikesh',
          'Personal insurance',
          'Extra activities'
        ],
        isActive: true
      },
      // NEW PACKAGES BELOW
      {
        title: 'Coorg Plantation & Waterfall Trek',
        description: 'Explore lush coffee plantations and trek to scenic waterfalls. Experience the beauty of the "Scotland of India" with its misty hills and aromatic spice gardens.',
        location: 'Coorg, India',
        type: 'Nature',
        duration: 4,
        price: 450,
        maxGroupSize: 15,
        difficulty: 'Easy',
        rating: 4.7,
        reviewCount: 89,
        imageUrl: 'https://unsplash.com/photos/photographer-asian-woman-traveling-photograph-nature-travel-relax-in-the-holiday-walk-in-the-forest-R5RFHVeJcrM',
        bestSeason: 'winter, summer',
        weather: 'moderate, misty',
        highlights: [
          'Coffee plantation tours',
          'Abbey Falls trek',
          'Spice garden visits',
          'Local Kodava culture experience'
        ],
        included: [
          'Accommodation in plantation stay',
          'All meals',
          'Guided plantation walks',
          'Waterfall treks',
          'Local transport'
        ],
        excluded: [
          'Travel to/from Coorg',
          'Personal expenses',
          'Travel insurance'
        ],
        isActive: true
      },
      {
        title: 'Goa Beach & Nightlife Experience',
        description: 'Relax on pristine beaches and experience vibrant nightlife. Enjoy water sports, Portuguese heritage sites, and famous beach shacks.',
        location: 'Goa, India',
        type: 'Beach',
        duration: 5,
        price: 550,
        maxGroupSize: 20,
        difficulty: 'Easy',
        rating: 4.5,
        reviewCount: 245,
        imageUrl: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2',
        bestSeason: 'winter',
        weather: 'sunny, pleasant',
        highlights: [
          'Beach hopping',
          'Water sports',
          'Old Goa heritage tour',
          'Beach parties and nightlife'
        ],
        included: [
          'Beach resort accommodation',
          'Breakfast',
          'Bike rental',
          'Guided heritage tour',
          'Airport transfers'
        ],
        excluded: [
          'Flights',
          'Lunch and dinner',
          'Water sports charges',
          'Club entry fees'
        ],
        isActive: true
      },
      {
        title: 'Darjeeling Nature Expedition',
        description: 'Tea gardens, mountain views, and the iconic toy train ride. Witness the sunrise over Kanchenjunga and explore colonial-era charm.',
        location: 'Darjeeling, India',
        type: 'Nature',
        duration: 6,
        price: 680,
        maxGroupSize: 12,
        difficulty: 'Moderate',
        rating: 4.8,
        reviewCount: 178,
        imageUrl: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7',
        bestSeason: 'spring, summer, autumn',
        weather: 'cool, pleasant',
        highlights: [
          'Tiger Hill sunrise',
          'Toy train ride',
          'Tea plantation tours',
          'Buddhist monasteries'
        ],
        included: [
          'Hotel accommodation',
          'All meals',
          'Toy train tickets',
          'Tea garden visits',
          'Local sightseeing'
        ],
        excluded: [
          'Travel to Darjeeling',
          'Personal expenses',
          'Tips',
          'Travel insurance'
        ],
        isActive: true
      },
      {
        title: 'Manali Cultural Expedition',
        description: 'Experience Himalayan culture and ancient temples. Explore traditional villages, monasteries, and local handicraft markets.',
        location: 'Manali, India',
        type: 'Cultural',
        duration: 6,
        price: 720,
        maxGroupSize: 15,
        difficulty: 'Easy',
        rating: 4.6,
        reviewCount: 132,
        imageUrl: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23',
        bestSeason: 'summer',
        weather: 'pleasant, cool',
        highlights: [
          'Hadimba Temple visit',
          'Old Manali village walk',
          'Tibetan monasteries',
          'Local market shopping'
        ],
        included: [
          'Hotel accommodation',
          'Breakfast and dinner',
          'Cultural tour guide',
          'Temple visits',
          'Local transport'
        ],
        excluded: [
          'Travel to Manali',
          'Lunch',
          'Adventure activities',
          'Shopping expenses'
        ],
        isActive: true
      },
      {
        title: 'Rajasthan Spiritual Expedition',
        description: 'Visit ancient temples, forts, and spiritual sites. Experience the royal heritage and vibrant spirituality of Rajasthan.',
        location: 'Rajasthan, India',
        type: 'Spiritual',
        duration: 7,
        price: 850,
        maxGroupSize: 18,
        difficulty: 'Easy',
        rating: 4.7,
        reviewCount: 167,
        imageUrl: 'https://images.unsplash.com/photo-1599661046289-e31897846e41',
        bestSeason: 'winter',
        weather: 'cool, pleasant',
        highlights: [
          'Pushkar temple visits',
          'Ajmer Sharif Dargah',
          'Jaipur city palace',
          'Evening aarti ceremonies'
        ],
        included: [
          'Heritage hotel stays',
          'All meals',
          'Spiritual guide',
          'Temple visits',
          'AC transport'
        ],
        excluded: [
          'Flights',
          'Personal expenses',
          'Camera fees at monuments',
          'Tips'
        ],
        isActive: true
      },
      {
        title: 'Kerala Adventure Expedition',
        description: 'Backwaters, wildlife, and hill station adventures. Experience the diverse landscapes of God\'s Own Country.',
        location: 'Kerala, India',
        type: 'Adventure',
        duration: 7,
        price: 920,
        maxGroupSize: 14,
        difficulty: 'Moderate',
        rating: 4.9,
        reviewCount: 201,
        imageUrl: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944',
        bestSeason: 'winter, summer',
        weather: 'moderate, humid',
        highlights: [
          'Houseboat cruise',
          'Periyar wildlife safari',
          'Trekking in Western Ghats',
          'Spice plantation tours'
        ],
        included: [
          'Hotels and houseboat',
          'All meals',
          'Wildlife permits',
          'Trekking guide',
          'All transfers'
        ],
        excluded: [
          'Flights',
          'Ayurvedic treatments',
          'Personal expenses',
          'Travel insurance'
        ],
        isActive: true
      },
      {
        title: 'Andaman Wildlife Expedition',
        description: 'Explore pristine beaches and marine biodiversity. Snorkeling, diving, and island hopping in the Bay of Bengal.',
        location: 'Andaman Islands, India',
        type: 'Wildlife',
        duration: 6,
        price: 1200,
        maxGroupSize: 12,
        difficulty: 'Easy',
        rating: 4.8,
        reviewCount: 143,
        imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19',
        bestSeason: 'winter',
        weather: 'sunny, tropical',
        highlights: [
          'Radhanagar Beach',
          'Cellular Jail history',
          'Snorkeling at Elephant Beach',
          'Baratang limestone caves'
        ],
        included: [
          'Beach resort accommodation',
          'All meals',
          'Ferry tickets',
          'Snorkeling equipment',
          'Island tours'
        ],
        excluded: [
          'Flights',
          'Scuba diving',
          'Seaplane rides',
          'Personal expenses'
        ],
        isActive: true
      },
      {
        title: 'Ladakh Adventure Expedition',
        description: 'High altitude desert, monasteries, and mountain passes. Experience the rugged beauty of the Himalayas.',
        location: 'Ladakh, India',
        type: 'Adventure',
        duration: 8,
        price: 1500,
        maxGroupSize: 10,
        difficulty: 'Challenging',
        rating: 5.0,
        reviewCount: 98,
        imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
        bestSeason: 'summer',
        weather: 'sunny, cold',
        highlights: [
          'Pangong Lake visit',
          'Nubra Valley sand dunes',
          'Khardung La pass',
          'Ancient Buddhist monasteries'
        ],
        included: [
          'Guesthouses and camps',
          'All meals',
          '4x4 vehicle with driver',
          'Inner line permits',
          'Oxygen cylinders'
        ],
        excluded: [
          'Flights to Leh',
          'Travel insurance',
          'Bike rental',
          'Personal medication'
        ],
        isActive: true
      },
      {
        title: 'Kerala Beach Expedition',
        description: 'Pristine beaches and coastal village experiences. Relax on palm-fringed shores and enjoy fresh seafood.',
        location: 'Kerala, India',
        type: 'Beach',
        duration: 5,
        price: 650,
        maxGroupSize: 16,
        difficulty: 'Easy',
        rating: 4.6,
        reviewCount: 156,
        imageUrl: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07',
        bestSeason: 'winter, summer',
        weather: 'sunny, humid',
        highlights: [
          'Kovalam and Varkala beaches',
          'Lighthouse visits',
          'Ayurvedic massages',
          'Coastal cuisine'
        ],
        included: [
          'Beach resort stay',
          'Breakfast',
          'Beach activities',
          'Sunset cruise',
          'Local transport'
        ],
        excluded: [
          'Flights',
          'Lunch and dinner',
          'Ayurvedic spa treatments',
          'Water sports'
        ],
        isActive: true
      },
      {
        title: 'Munnar Tea Garden Expedition',
        description: 'Tea plantations, misty hills, and scenic landscapes. Explore the green carpeted valleys of Munnar.',
        location: 'Munnar, India',
        type: 'Nature',
        duration: 5,
        price: 580,
        maxGroupSize: 14,
        difficulty: 'Easy',
        rating: 4.7,
        reviewCount: 189,
        imageUrl: 'https://unsplash.com/photos/a-lush-green-hillside-with-a-stream-running-through-it-qHj0sGMZJF0',
        bestSeason: 'winter, summer',
        weather: 'cool, misty',
        highlights: [
          'Tea factory tours',
          'Eravikulam National Park',
          'Mattupetty Dam',
          'Echo Point'
        ],
        included: [
          'Hill resort accommodation',
          'All meals',
          'Tea plantation tours',
          'Park entry fees',
          'Sightseeing transport'
        ],
        excluded: [
          'Travel to Munnar',
          'Adventure activities',
          'Shopping',
          'Travel insurance'
        ],
        isActive: true
      },
      {
        title: 'Manali Adventure Expedition',
        description: 'Trekking, paragliding, and river rafting adventures. Experience adrenaline-pumping activities in the Himalayas.',
        location: 'Manali, India',
        type: 'Adventure',
        duration: 6,
        price: 780,
        maxGroupSize: 12,
        difficulty: 'Moderate',
        rating: 4.8,
        reviewCount: 223,
        imageUrl: 'https://images.unsplash.com/photo-1559628376-f3fe5f782a2e',
        bestSeason: 'summer',
        weather: 'pleasant, cool',
        highlights: [
          'Paragliding at Solang Valley',
          'River rafting on Beas',
          'Trekking to Jogini Falls',
          'Mountain biking'
        ],
        included: [
          'Adventure resort stay',
          'Breakfast and dinner',
          'Paragliding session',
          'Rafting equipment',
          'Certified instructors'
        ],
        excluded: [
          'Travel to Manali',
          'Lunch',
          'Extra adventure activities',
          'Personal gear'
        ],
        isActive: true
      }
    ];

    const createdPackages = await Package.insertMany(packages);
    console.log(`✅ Created ${createdPackages.length} packages`);

    // Create sample offers
    const offers = [
      {
        title: 'Early Bird Discount',
        description: 'Book 60 days in advance and get 20% off on all adventure packages',
        discountPercentage: 20,
        code: 'EARLYBIRD20',
        validFrom: new Date(),
        validUntil: new Date('2025-12-31'),
        conditions: 'Book at least 60 days before trip start date',
        isActive: true
      },
      {
        title: 'Group Discount',
        description: 'Travel with 4+ people and get 15% off on your entire booking',
        discountPercentage: 15,
        code: 'GROUP15',
        validFrom: new Date(),
        validUntil: null,
        conditions: 'Minimum 4 people required',
        isActive: true
      },
      {
        title: 'Season Special',
        description: 'Get 25% off on monsoon packages. Experience nature at its best!',
        discountPercentage: 25,
        code: 'MONSOON25',
        validFrom: new Date(),
        validUntil: new Date('2025-09-30'),
        conditions: 'Valid only for monsoon season packages',
        isActive: true
      },
      {
        title: 'Student Discount',
        description: 'Students get an extra 10% off on all bookings with valid ID',
        discountPercentage: 10,
        code: 'STUDENT10',
        validFrom: new Date(),
        validUntil: null,
        conditions: 'Valid student ID required at check-in',
        isActive: true
      }
    ];

    const createdOffers = await Offer.insertMany(offers);
    console.log(`✅ Created ${createdOffers.length} offers`);

    // Create demo user
    const demoUser = new User({
      name: 'Demo User',
      email: 'demo@tourzio.com',
      password: 'Demo1234',
      phone: '+1234567890',
      isStudent: false
    });

    await demoUser.save();
    console.log('✅ Created demo user');
    console.log('   Email: demo@tourzio.com');
    console.log('   Password: Demo1234');

    console.log('\n🎉 Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run seed
const runSeed = async () => {
  await connectDB();
  await seedData();
};

runSeed();
