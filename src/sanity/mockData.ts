import { Category, Color, Company, Product, Offer } from '../types';

export const MOCK_COLORS: Color[] = [
  { _id: 'col_green', name: 'Emerald Green', colorCode: '#10B981' },
  { _id: 'col_blue', name: 'Royal Blue', colorCode: '#1D4ED8' },
  { _id: 'col_brown', name: 'Terracotta Brown', colorCode: '#B45309' },
  { _id: 'col_black', name: 'Matte Black', colorCode: '#1F2937' },
  { _id: 'col_red', name: 'Burgundy Red', colorCode: '#991B1B' },
  { _id: 'col_steel', name: 'Stainless Steel', colorCode: '#D1D5DB' },
];

export const MOCK_CATEGORIES: Category[] = [
  {
    _id: 'cat_appliances',
    categoryId: 'appliances',
    name: 'Kitchen Appliances',
    description: 'State-of-the-art blenders, mixer grinders, sandwich makers, and induction cooktops.',
    image: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?auto=format&fit=crop&q=80&w=600',
  },
  {
    _id: 'cat_cookware',
    categoryId: 'cookware',
    name: 'Premium Cookware',
    description: 'Authentic non-stick pans, grill plates, steel pots, and durable casseroles.',
    image: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&q=80&w=600',
  },
  {
    _id: 'cat_flasks',
    categoryId: 'flasks',
    name: 'Bottles & Flasks',
    description: 'Thermosteel insulation, copper-infused designs, and ultra-durable carry flasks.',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80&w=600',
  },
  {
    _id: 'cat_casseroles',
    categoryId: 'casseroles',
    name: 'Casseroles & Tiffins',
    description: 'Insulated hot-pots, casseroles, and multi-tier office tiffins to keep food hot.',
    image: 'https://images.unsplash.com/photo-1599689017234-5858cf0696a5?auto=format&fit=crop&q=80&w=600',
  }
];

export const MOCK_COMPANIES: Company[] = [
  {
    _id: 'comp_milton',
    companyId: 'milton',
    name: 'Milton',
    image: 'https://images.unsplash.com/photo-1592861956120-e524fc739696?auto=format&fit=crop&q=80&w=200',
    categoriesAvailable: [
      MOCK_CATEGORIES[2], // Bottles & Flasks
      MOCK_CATEGORIES[3], // Casseroles & Tiffins
      MOCK_CATEGORIES[0], // Appliances (Sandwich makers)
    ],
  },
  {
    _id: 'comp_procook',
    companyId: 'procook',
    name: 'Procook',
    image: 'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&q=80&w=200',
    categoriesAvailable: [
      MOCK_CATEGORIES[1], // Premium Cookware
    ],
  },
  {
    _id: 'comp_prestige',
    companyId: 'prestige',
    name: 'Prestige',
    image: 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?auto=format&fit=crop&q=80&w=200',
    categoriesAvailable: [
      MOCK_CATEGORIES[0], // Kitchen Appliances
      MOCK_CATEGORIES[1], // Premium Cookware
    ],
  },
  {
    _id: 'comp_pigeon',
    companyId: 'pigeon',
    name: 'Pigeon',
    image: 'https://images.unsplash.com/photo-1517256064527-09c53b2d0bc6?auto=format&fit=crop&q=80&w=200',
    categoriesAvailable: [
      MOCK_CATEGORIES[0], // Kitchen Appliances
    ],
  },
];

export const MOCK_PRODUCTS: Product[] = [
  {
    _id: 'prod_1',
    productId: 'm_casserole_oyster',
    name: 'Oyster Casserole (Milton)',
    description: 'Thermo-insulated food-grade casseroles with premium locking lids and sophisticated ribbed exterior. Keeps food piping hot for up to 6 hours.',
    company: MOCK_COMPANIES[0], // Milton
    category: MOCK_CATEGORIES[3], // Casseroles
    size: '1500 ml',
    mrp: 550,
    price: 454,
    discount: 17,
    colors: [MOCK_COLORS[0], MOCK_COLORS[1], MOCK_COLORS[2], MOCK_COLORS[3]],
    image: 'https://images.unsplash.com/photo-1599689017234-5858cf0696a5?auto=format&fit=crop&q=80&w=600',
  },
  {
    _id: 'prod_2',
    productId: 'm_copper_charge',
    name: 'Copper Charge Design Bottle',
    description: 'Pure copper designer flask built with premium health advantages. Rejuvanates drinking water, includes advanced leak-proof and scratch-proof structure.',
    company: MOCK_COMPANIES[0], // Milton
    category: MOCK_CATEGORIES[2], // Flasks
    size: '950 ml',
    mrp: 1412,
    price: 1164,
    discount: 17,
    colors: [MOCK_COLORS[2]],
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80&w=600',
  },
  {
    _id: 'prod_3',
    productId: 'p_kitchen_jewel',
    name: 'Kitchen Jewel Plus Set',
    description: 'Comprehensive 4-piece cookware set including non-stick fry pan, flat kadhai, tawa, and a glass-tempered lid. Red premium heat-resistant outer coating.',
    company: MOCK_COMPANIES[1], // Procook
    category: MOCK_CATEGORIES[1], // Cookware
    size: '4 pcs set',
    mrp: 3500,
    price: 2799,
    discount: 20,
    colors: [MOCK_COLORS[4]],
    image: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&q=80&w=600',
  },
  {
    _id: 'prod_4',
    productId: 'm_aura_thermo',
    name: 'Aura Thermosteel Bottle',
    description: 'Double-walled vacuum insulated stainless steel bottle. Keeps drinks icy cold for 24 hours or steaming hot for 18 hours. Modern sleek matte-black design.',
    company: MOCK_COMPANIES[0], // Milton
    category: MOCK_CATEGORIES[2], // Flasks
    size: '1000 ml',
    mrp: 1100,
    price: 899,
    discount: 18,
    colors: [MOCK_COLORS[3], MOCK_COLORS[5]],
    image: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&q=80&w=600',
  },
  {
    _id: 'prod_5',
    productId: 'm_mixer_duo',
    name: 'Milton Duo-Blend Mixer Grinder',
    description: 'Heavy duty 750W copper motor with elegant sapphire blue grooved chassis, offering silent yet powerful grinding. Comes with dual transparent break-resistant canisters.',
    company: MOCK_COMPANIES[0], // Milton
    category: MOCK_CATEGORIES[0], // Appliances
    size: '750W, 2 Jars',
    mrp: 5500,
    price: 4299,
    discount: 21,
    colors: [MOCK_COLORS[1]],
    image: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?auto=format&fit=crop&q=80&w=600',
  },
  {
    _id: 'prod_6',
    productId: 'pres_mixer_ruby',
    name: 'Prestige Ruby Mixer Grinder',
    description: 'Sophisticated deep-burgundy chassis. 3-speed speed dial controls, 4 heavy-duty stainless steel jars, perfect for both wet and dry culinary pureeing & mixing.',
    company: MOCK_COMPANIES[2], // Prestige
    category: MOCK_CATEGORIES[0], // Appliances
    size: '900W, 4 Jars',
    mrp: 6200,
    price: 4950,
    discount: 20,
    colors: [MOCK_COLORS[4], MOCK_COLORS[5]],
    image: 'https://images.unsplash.com/photo-1585238342024-78d387f4a707?auto=format&fit=crop&q=80&w=600',
  },
  {
    _id: 'prod_7',
    productId: 'p_grill_pan',
    name: 'Procook Non-Stick Grill Pan',
    description: 'Cast aluminium square grill pan featuring deep ridges for optimal smoke-charring. Heat-resistant red handle keeps cooks safe from extreme thermal bursts.',
    company: MOCK_COMPANIES[1], // Procook
    category: MOCK_CATEGORIES[1], // Cookware
    size: '26cm x 26cm',
    mrp: 1800,
    price: 1390,
    discount: 22,
    colors: [MOCK_COLORS[4], MOCK_COLORS[3]],
    image: 'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?auto=format&fit=crop&q=80&w=600',
  },
  {
    _id: 'prod_8',
    productId: 'pres_multi_pot',
    name: 'Prestige Stainless Steel Multi-Pot Set',
    description: 'Triple-clad commercial induction pot with steam-release venting tempered glass lid. Absolute luxury brushed metal with stay-cool heavy stainless handles.',
    company: MOCK_COMPANIES[2], // Prestige
    category: MOCK_CATEGORIES[1], // Cookware
    size: '3.5 Liters',
    mrp: 2400,
    price: 1850,
    discount: 22,
    colors: [MOCK_COLORS[5]],
    image: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&q=80&w=600',
  },
  {
    _id: 'prod_9',
    productId: 'm_sandwich_maker',
    name: 'Milton Premium Sandwich Maker',
    description: 'Toast and press beautifully detailed panini sandwiches. Heat-retaining non-stick grill plates, automatic indicator heating light indicators, in elegant black plastic.',
    company: MOCK_COMPANIES[0], // Milton
    category: MOCK_CATEGORIES[0], // Appliances
    size: '2-Slice',
    mrp: 2200,
    price: 1699,
    discount: 22,
    colors: [MOCK_COLORS[3]],
    image: 'https://images.unsplash.com/photo-1481070414801-51fd732d7184?auto=format&fit=crop&q=80&w=600',
  },
  {
    _id: 'prod_10',
    productId: 'pres_induction_chef',
    name: 'Prestige Sleek Induction Cooktop',
    description: 'High thermal-efficiency ceramic cooktop. Elegant touch controls, quick-cook preset menus, automated power-saving sensors protecting against low power spikes.',
    company: MOCK_COMPANIES[2], // Prestige
    category: MOCK_CATEGORIES[0], // Appliances
    size: '1800W, Touch',
    mrp: 3800,
    price: 2999,
    discount: 21,
    colors: [MOCK_COLORS[3]],
    image: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?auto=format&fit=crop&q=80&w=600',
  },
  {
    _id: 'prod_11',
    productId: 'pig_electric_kettle',
    name: 'Pigeon Glass Electric Kettle',
    description: 'Gleaming borosilicate glass kettle with soft indigo heating LED halos, perfect for instantly boiling tea, milk, or preparing boiling hot storage water.',
    company: MOCK_COMPANIES[3], // Pigeon
    category: MOCK_CATEGORIES[0], // Appliances
    size: '1.8 Liters',
    mrp: 1500,
    price: 1150,
    discount: 23,
    colors: [MOCK_COLORS[1], MOCK_COLORS[5]],
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&q=80&w=600',
  },
  {
    _id: 'prod_12',
    productId: 'm_optima_tiffin',
    name: 'Milton Optima Insulated Tiffin',
    description: 'Triple stacked leak-proof steel dabbas within a thermal canvas carrying jacket, guaranteeing hot domestic lunches on long corporate days.',
    company: MOCK_COMPANIES[0], // Milton
    category: MOCK_CATEGORIES[3], // Casseroles
    size: '3 Tier Steel',
    mrp: 1200,
    price: 980,
    discount: 18,
    colors: [MOCK_COLORS[3], MOCK_COLORS[5]],
    image: 'https://images.unsplash.com/photo-1592861956120-e524fc739696?auto=format&fit=crop&q=80&w=600',
  },
];

export const MOCK_OFFERS: Offer[] = [
  {
    _id: 'off_1',
    offerId: 'festive_milton',
    title: 'Festive Milton Casserole Surge',
    description: 'Get Flat 17% discount on all Milton Premium Insulated Casseroles and select Thermo-Tiffins.',
    company: MOCK_COMPANIES[0],
    discount: 17,
    image: 'https://images.unsplash.com/photo-1599689017234-5858cf0696a5?auto=format&fit=crop&q=80&w=600',
    featured: true,
  },
  {
    _id: 'off_2',
    offerId: 'procook_jewel',
    title: 'Procook Non-Stick Red Ruby Bundle',
    description: 'Purchase any Kitchen Jewel set and get an additional flat 20% cashback or direct instant store billing.',
    company: MOCK_COMPANIES[1],
    discount: 20,
    image: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&q=80&w=600',
    featured: true,
  },
  {
    _id: 'off_3',
    offerId: 'prestige_appliances_deal',
    title: 'Prestige Safe Kitchen Initiative',
    description: 'Get a flat 21% off on standard induction cookers, heavy food grinders, and stainless multi-pots.',
    company: MOCK_COMPANIES[2],
    discount: 21,
    image: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?auto=format&fit=crop&q=80&w=600',
    featured: false,
  },
];
