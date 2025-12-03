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
        imageUrl: 'https://images.unsplash.com/photo-1534943441045-1b373a6f8f0e',
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
