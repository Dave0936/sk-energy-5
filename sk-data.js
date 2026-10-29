(function () {
  const I = n => 'images/sk/sk-' + n + '.jpg';
  const svc = slug => 'Service.dc.html?slug=' + slug;
  const cs = slug => 'CaseStudy.dc.html?slug=' + slug;
  const post = slug => 'Article.dc.html?slug=' + slug;

  const services = [
    {
      slug: 'solar-pv', nav: 'Solar PV', short: 'Panels designed around your roof',
      title: 'Solar sized to how your home actually runs.',
      standfirst: 'Roof or ground-mount arrays designed around your consumption, modelled before anything is ordered and installed to last.',
      hero: I('04'), heroAlt: 'A white Scottish home with solar panels on the roof',
      kicker: 'Solar PV',
      intro: 'Every array starts with a survey of your roof, shading and a year of usage. We model the yield before anything is ordered, so you know what the panels will generate — and what they will save — before the scaffold goes up.',
      stat: { v: '6.4 kWp', l: 'Typical family-home array' },
      benefitsTitle: 'What it changes',
      benefits: [
        { t: 'Lower bills', x: 'Generate a large share of your own electricity and buy far less from the grid at peak rates.' },
        { t: 'Modelled first', x: 'Yield and savings calculated from your roof and usage, not a brochure figure.' },
        { t: 'Built to last', x: 'Tier-one panels and inverters, an MCS-certified install and 25-year panel warranties.' }
      ],
      feature: { kicker: 'Design', title: 'Panels that suit the building', text: 'Architecturally led layouts — all-black panels, clean cable runs and arrays set out to respect the roofline, whether it is a new build or a listed stone farmhouse.', img: I('25'), alt: 'A stone barn conversion with solar panels on the roof' },
      fits: [
        { t: 'Homes', x: 'Daytime generation that powers the house, the heat pump and the car.' },
        { t: 'Businesses', x: 'Arrays sized to daytime load on workshops, offices and farms.' },
        { t: 'New builds', x: 'Panels and cabling planned in at drawing stage.' }
      ]
    },
    {
      slug: 'battery-storage', nav: 'Battery Storage', short: 'Keep the power you generate',
      title: 'Keep the power you make for when you need it.',
      standfirst: 'Home and commercial batteries sized to your evening demand and tariff, so generation from the roof keeps working after sunset.',
      hero: I('17'), heroAlt: 'A wall-mounted home battery and inverter',
      kicker: 'Battery Storage',
      intro: 'Most homes use the bulk of their electricity in the evening, when solar has stopped. A correctly sized battery stores daytime surplus and can top up on cheap off-peak rates through winter.',
      stat: { v: '10 kWh', l: 'Typical home battery capacity' },
      benefitsTitle: 'Why add storage',
      benefits: [
        { t: 'Use more of your own', x: 'Store daytime generation instead of exporting it for pennies.' },
        { t: 'Off-peak charging', x: 'Fill up overnight on a cheap tariff and run the house through the peak.' },
        { t: 'Backup ready', x: 'Systems available with backup power for outages, specified on request.' }
      ],
      feature: { kicker: 'Sizing', title: 'Sized to your evenings, not the price list', text: 'We size storage to your actual evening demand and tariff — not to the biggest unit available — so every kilowatt-hour earns its place on the wall.', img: I('01'), alt: 'Two engineers wiring an inverter and consumer unit' },
      fits: [
        { t: 'With new solar', x: 'Designed alongside the array for the best return.' },
        { t: 'Existing solar', x: 'Retrofit a battery to panels you already have.' },
        { t: 'No solar yet', x: 'Charge on off-peak rates and save on the peak.' }
      ]
    },
    {
      slug: 'heat-pumps', nav: 'Heat Pumps', short: 'Low-carbon heating and hot water',
      title: 'Warm rooms, quietly — at a fraction of the carbon of gas.',
      standfirst: 'Design, installation and maintenance of air source heat pumps, with emitters sized room by room so every space stays comfortable.',
      hero: I('14'), heroAlt: 'A stone farmhouse with an air source heat pump',
      kicker: 'Heat Pumps',
      intro: 'A heat pump is only as good as the heat-loss survey behind it. We calculate every room, size the emitters to match, and set the system up to run low and steady — which is where the savings come from.',
      stat: { v: '3.8', l: 'Typical seasonal performance (SCOP)' },
      benefitsTitle: 'Why it works in a Scottish winter',
      benefits: [
        { t: 'Efficient', x: 'Roughly three to four units of heat for every unit of electricity it uses.' },
        { t: 'Even warmth', x: 'Low flow temperatures and correctly sized emitters mean no cold rooms.' },
        { t: 'Grant-ready', x: 'MCS certification keeps you eligible for Home Energy Scotland funding.' }
      ],
      feature: { kicker: 'Hot water', title: 'Heating and hot water from one system', text: 'A correctly sized cylinder and controls set up at commissioning mean plentiful hot water without the system working harder than it needs to.', img: I('16'), alt: 'An engineer commissioning a hot water cylinder' },
      fits: [
        { t: 'Off-oil homes', x: 'Replace an oil or LPG boiler without changing how the house feels.' },
        { t: 'Stone & older properties', x: 'Careful heat-loss modelling for solid walls and mixed construction.' },
        { t: 'Paired with solar', x: 'Run the heat pump on your own generation through spring and autumn.' }
      ]
    },
    {
      slug: 'ev-chargers', nav: 'EV Chargers', short: 'Smart charging at home',
      title: 'Fill up on your own roof.',
      standfirst: 'Smart home and workplace chargers with load balancing and tariff scheduling, so you charge on the cheapest — and cleanest — hours.',
      hero: I('06'), heroAlt: 'A phone showing an EV charging app beside a charging car',
      kicker: 'EV Chargers',
      intro: 'A charger wired into the same system as your panels and battery means the cheapest electricity in the house goes to the car. We handle the load assessment, DNO notification and the install in one visit.',
      stat: { v: '7 kW', l: 'Standard home charge rate' },
      benefitsTitle: 'Charging that thinks for itself',
      benefits: [
        { t: 'Solar-aware', x: 'Divert surplus generation straight into the car instead of exporting it.' },
        { t: 'Tariff scheduling', x: 'Charge automatically in the off-peak window, set once in the app.' },
        { t: 'Load balancing', x: 'The charger backs off when the house needs power, so nothing trips.' }
      ],
      feature: { kicker: 'Workplace', title: 'One charger or twenty', text: 'Workplace installs scaled to your site supply, with reporting so you can see exactly what each vehicle uses.', img: I('13'), alt: 'An electric car charging at dusk beside a stone wall' },
      fits: [
        { t: 'Homes', x: 'Driveway or garage, tethered or untethered, matched to your car.' },
        { t: 'Workplaces', x: 'Staff and visitor charging with access control.' },
        { t: 'Developments', x: 'EV-ready provision written into every plot.' }
      ]
    },
    {
      slug: 'underfloor-heating', nav: 'Underfloor Heating', short: 'Even, efficient warmth in every room',
      title: 'Even warmth, from the floor up.',
      standfirst: 'Where SK Energy started. Underfloor heating designed room by room — the ideal partner for a heat pump, running at low temperatures for comfort and efficiency.',
      hero: I('10'), heroAlt: 'Bare feet on a warm oak floor in a bright kitchen',
      kicker: 'Underfloor Heating',
      intro: 'Underfloor heating turns the whole floor into a gentle, even emitter. Because it works at low flow temperatures, it lets a heat pump run at its most efficient — and frees every wall from radiators.',
      stat: { v: '35°C', l: 'Typical flow temperature with a heat pump' },
      benefitsTitle: 'Why underfloor',
      benefits: [
        { t: 'Even comfort', x: 'Warmth across the whole floor — no hot spots, no cold corners.' },
        { t: 'Heat pump partner', x: 'Low flow temperatures keep heat pump performance high.' },
        { t: 'Free walls', x: 'No radiators, so every room can be laid out the way you want.' }
      ],
      feature: { kicker: 'Installation', title: 'Laid with care, zone by zone', text: 'Wet systems laid in screed or overlay for renovations, each room on its own zone and thermostat, pressure-tested before the floor goes down.', img: I('07'), alt: 'Underfloor heating pipework laid across a room' },
      fits: [
        { t: 'Renovations', x: 'Low-profile overlay systems for existing floors.' },
        { t: 'Extensions', x: 'Ideal for open-plan kitchens and garden rooms.' },
        { t: 'New builds', x: 'Specified plot by plot with the heat pump.' }
      ]
    }
  ];

  const cases = [
    {
      slug: 'kinross-farmhouse', n: '01', sector: 'Residential retrofit', location: 'Kinross',
      title: 'Kinross farmhouse, off the oil',
      summary: 'A 1920s stone farmhouse running on an oil boiler. Solar with storage, a 12 kW heat pump and underfloor through the ground floor, staged so the family stayed in the house throughout.',
      hero: I('21'), heroAlt: 'A stone farmhouse with roof solar under a dramatic sky',
      stats: [{ v: '£34,600', l: 'Budget' }, { v: '£2,150/yr', l: 'Energy saved' }, { v: '3 weeks', l: 'On site' }],
      systems: ['Solar PV', 'Battery Storage', 'Heat Pumps', 'Underfloor Heating'],
      completed: 'March 2026', duration: '3 weeks',
      sections: [
        { t: 'The brief', p: ['The family were spending heavily on heating oil every winter and still had cold rooms at the back of the house. They wanted off oil entirely, without living in a building site.', 'Solid stone walls and a mix of original and extended rooms meant the heat-loss survey had to be done room by room.'] },
        { t: 'Our approach', p: ['We modelled the heat loss of every room, then specified a 12 kW air source heat pump with underfloor heating through the ground floor and upsized radiators upstairs.', 'A 6.8 kWp array and 10 kWh battery were sized to cover the heat pump through spring and autumn. Work was staged one zone at a time so the family stayed in the house.'] },
        { t: 'The outcome', p: ['The oil tank is gone. The house is warmer than it has ever been, and the first full year came in roughly £2,150 below what the family were paying before.'] }
      ],
      gallery: [{ src: I('11'), alt: 'The ground floor living space with new underfloor heating', cap: 'Ground floor, underfloor throughout' }, { src: I('14'), alt: 'The heat pump on the farmhouse gable end', cap: '12 kW heat pump on the gable end' }],
      quote: { q: 'Underfloor through the whole ground floor and a heat pump outside. Two winters in and the bills have not moved — and when we had a question, the same engineer answered.', n: 'Sarah Finlay', r: 'Homeowner, Kinross' }
    },
    {
      slug: 'rosyth-workshop', n: '02', sector: 'Commercial', location: 'Rosyth',
      title: 'Rosyth engineering workshop',
      summary: 'Daytime machine load made this an easy case for roof solar. Twenty-two panels on the flat roof, two workplace chargers by the door, and monitoring that shows exactly what the roof earns.',
      hero: I('23'), heroAlt: 'An engineering workshop with EV chargers by the door',
      stats: [{ v: '£18,400', l: 'Budget' }, { v: '41%', l: 'Day load covered' }, { v: '4.1 yrs', l: 'Payback' }],
      systems: ['Solar PV', 'EV Chargers'],
      completed: 'June 2026', duration: '6 days',
      sections: [
        { t: 'The brief', p: ['Electricity was the workshop’s biggest overhead after wages. The owners wanted a clear payback figure and no interruption to production.'] },
        { t: 'Our approach', p: ['Half-hourly meter data showed a steady daytime load — ideal for solar. We specified a 9.9 kWp flat-roof array and two 7 kW chargers for the company vans.', 'Installation ran over six days with the switchover done out of hours.'] },
        { t: 'The outcome', p: ['The roof now covers around 41% of the daytime load, the vans charge on site, and the final invoice landed within fifty pounds of the quote.'] }
      ],
      gallery: [{ src: I('01'), alt: 'Engineers wiring the inverter and distribution board', cap: 'Inverter and distribution board' }, { src: I('17'), alt: 'Wall-mounted inverter and battery units', cap: 'Monitoring and inverter wall' }],
      quote: { q: 'Our workshop bills were the problem. They put 22 panels on the flat roof and a charger by the door, and the quote landed within fifty pounds of the invoice.', n: 'Dougie Hunter', r: 'Owner, Rosyth' }
    },
    {
      slug: 'halbeath-development', n: '03', sector: 'New build', location: 'Halbeath, Dunfermline',
      title: 'Halbeath, 26 plots on programme',
      summary: 'Heat pump, underfloor and EV provision on every plot, sequenced with the developer’s trades from first fix. Every plot handed over compliant, with commissioning packs ready for the buyer.',
      hero: I('20'), heroAlt: 'Aerial view of the Halbeath new-build development',
      stats: [{ v: '£412k', l: 'Contract' }, { v: '26', l: 'Plots' }, { v: '0', l: 'Weeks lost' }],
      systems: ['Heat Pumps', 'Underfloor Heating', 'EV Chargers'],
      completed: 'August 2026', duration: '14 months, phased',
      sections: [
        { t: 'The brief', p: ['A 26-plot development needing low-carbon heating and EV provision on every home, delivered without holding up the build programme.'] },
        { t: 'Our approach', p: ['We standardised the specification across house types, assigned a dedicated site lead, and sequenced first fix, second fix and commissioning around the developer’s trades.'] },
        { t: 'The outcome', p: ['All 26 plots were handed over compliant and on schedule, each with a buyer commissioning pack. Not a single week was lost to the heating or EV package.'] }
      ],
      gallery: [{ src: I('22'), alt: 'Completed homes with heat pumps installed', cap: 'Heat pumps on completed plots' }, { src: I('07'), alt: 'Underfloor heating being laid on site', cap: 'Underfloor at first fix' }],
      quote: { q: 'Twenty-six plots, chargers and underfloor on every one, and not a single week lost. They handled the sign-offs we usually chase.', n: 'Ross Bain', r: 'Site manager, Fife developer' }
    }
  ];

  const posts = [
    {
      slug: 'heat-pump-running-costs-fife-winter', cat: 'Guide', read: 6, date: '14 October 2026',
      title: 'What a heat pump actually costs to run in a Fife winter',
      excerpt: 'Twelve months of metered data from four local installs, set against what the same houses paid for gas.',
      img: I('14'), alt: 'A stone farmhouse with an air source heat pump',
      author: { n: 'Kirsty Moffat', r: 'Heating design lead' },
      blocks: [
        { k: 'p', x: 'The question we hear most is simple: what will it cost to run? Rather than quote a manufacturer figure, we pulled a year of metered data from four homes we installed in Fife and compared it to what each household paid for gas the year before.' },
        { k: 'h', x: 'The four homes' },
        { k: 'p', x: 'A 1970s semi, a stone farmhouse, a 2000s detached and a bungalow. All four had heat-loss surveys, correctly sized emitters and weather compensation set up at commissioning.' },
        { k: 'stat', v: '£612', l: 'Average saving over the winter quarter, across the four homes' },
        { k: 'p', x: 'Every home used less money on heating through December to February than it had on gas. The biggest saving came from the farmhouse, which had been heating with oil.' },
        { k: 'q', x: 'The savings come from running low and steady. A heat pump that is cycling on and off is a heat pump that was sized badly.' },
        { k: 'h', x: 'What made the difference' },
        { k: 'p', x: 'Flow temperature. The homes that ran at 40°C or below on the coldest days had the best performance. That comes down to emitter sizing at design stage, not the brand of the unit.' }
      ]
    },
    {
      slug: 'home-energy-scotland-grant-loan', cat: 'Funding', read: 4, date: '2 October 2026',
      title: 'Home Energy Scotland grant & loan, explained plainly',
      excerpt: 'What you can claim, what counts as an eligible measure, and the order to do things in so nothing gets refused.',
      img: I('03'), alt: 'System design drawings on a desk',
      author: { n: 'Euan Drummond', r: 'Customer advisor' },
      blocks: [
        { k: 'p', x: 'Home Energy Scotland offers grant and interest-free loan funding towards heat pumps, solar and insulation. The scheme is generous, but the order you do things in matters.' },
        { k: 'h', x: 'Apply before you commit' },
        { k: 'p', x: 'Funding has to be approved before work starts. We help you get a quote that meets the scheme requirements, then you apply, then we book the install.' },
        { k: 'q', x: 'The most common refusal we see is someone who signed a contract before their application was approved.' },
        { k: 'h', x: 'Why MCS matters' },
        { k: 'p', x: 'Only MCS-certified installers can deliver funded work. SK Energy is MCS certified and TrustMark endorsed, so the paperwork is handled as part of the job.' }
      ]
    },
    {
      slug: 'ev-charging-off-peak-tariff', cat: 'EV', read: 3, date: '18 September 2026',
      title: 'Charging on an off-peak tariff: the numbers',
      excerpt: 'How much a smart charger and the right tariff save over a year of normal driving.',
      img: I('06'), alt: 'A phone showing an EV charging app beside a car',
      author: { n: 'Callum Reid', r: 'EV installation lead' },
      blocks: [
        { k: 'p', x: 'An EV charged on a standard tariff is cheaper than petrol. Charged in an off-peak window, it is dramatically cheaper.' },
        { k: 'stat', v: '4p', l: 'Approximate cost per mile on an off-peak tariff' },
        { k: 'p', x: 'A smart charger schedules itself into the cheap window automatically. Pair it with solar and it can also soak up daytime surplus at weekends.' },
        { k: 'h', x: 'What you need' },
        { k: 'p', x: 'A smart charger, a compatible tariff and, ideally, a battery to bank cheap overnight power for the house as well as the car.' }
      ]
    },
    {
      slug: 'two-engineers-join-dunfermline-team', cat: 'Company news', read: 2, date: '4 September 2026',
      title: 'Two more engineers join the Dunfermline team',
      excerpt: 'More capacity for heat pump installs and aftercare visits across Fife and Perth & Kinross.',
      img: I('15'), alt: 'An installer checking a roof survey on a tablet',
      author: { n: 'SK Energy', r: 'Dunfermline office' },
      blocks: [
        { k: 'p', x: 'We have welcomed two new engineers to the team, both MCS-trained in heat pump installation and commissioning.' },
        { k: 'p', x: 'It means shorter lead times for surveys and more capacity for aftercare visits — still with the same principle: the people who install your system are the people who look after it.' }
      ]
    },
    {
      slug: 'new-build-heat-standard-specification', cat: 'New build', read: 5, date: '21 August 2026',
      title: 'Specifying to the 2026 standard without redesigning the plot',
      excerpt: 'How developers are meeting the new heat standard with heat pumps and underfloor, without changing house types.',
      img: I('22'), alt: 'New-build terraced homes with heat pumps outside',
      author: { n: 'Kirsty Moffat', r: 'Heating design lead' },
      blocks: [
        { k: 'p', x: 'New homes in Scotland must now use clean heating. For most developers that means a heat pump — and the question is how to fit it without redesigning house types that already work.' },
        { k: 'h', x: 'Plan the plant space early' },
        { k: 'p', x: 'Cylinder space and the external unit location are the two decisions that need to be made at drawing stage. Everything else can follow the existing programme.' },
        { k: 'q', x: 'If the cylinder cupboard is on the drawings, the rest is sequencing.' },
        { k: 'p', x: 'We work with your architect to agree a standard specification per house type, then repeat it plot by plot.' }
      ]
    }
  ];

  services.forEach(s => { s.href = svc(s.slug); });
  cases.forEach(c => { c.href = cs(c.slug); });
  posts.forEach(p => { p.href = post(p.slug); });
  window.SK_DATA = { services, cases, posts, links: { landing: 'SK%20Energy%20Landing.dc.html' } };
})();
