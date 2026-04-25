-- ============================================================
-- PitchVault — Seed Data
-- Run this after schema.sql
-- ============================================================

-- ── CREATORS ─────────────────────────────────────────────────────────────────

insert into creators (id, name, handle, niche, tags, emoji, bg, saved, badges, reach, engagement, completed, rate, rate_num, bio, portfolio, brands, rating) values
(1,  'Jordan Reeves',   '@jordanreeves',       'Fitness',          array['UGC','Cinematic'],                    '🏋️', '#1a1208', false, array['verified','topPerformer'],             '248K', '6.4%', 14, '$1,800', 1800, 'Fitness creator specializing in high-energy UGC and cinematic brand videos. 5 years creating content for supplement and apparel brands.',         array['🏋️','💪','🥗','🏃','⚡','🎯'], array['Apex Nutrition','Nike Training','GNC'],            4.9),
(2,  'Maya Chen',       '@mayachen.creates',   'Fashion',          array['Aesthetic','Trending','Unboxing'],    '👗', '#10101a', false, array['verified','topPerformer'],             '512K', '4.9%', 31, '$2,400', 2400, 'Fashion and lifestyle creator known for highly aesthetic, trend-forward content. Specialty in product styling and unboxing videos.',              array['👗','👠','💄','🪞','✨','🛍️'], array['ZARA','Revolve','Nordstrom'],                     4.7),
(3,  'Caleb St. James', '@calebstjames',       'Faith-Based',      array['Faith-Based','Storytelling'],         '✨', '#0e1410', true,  array['verified','fastDelivery'],             '189K', '8.2%',  9, '$950',  950,  'Faith-based storyteller creating values-driven content for brands that align with a faith-forward audience.',                                     array['✨','📖','🌅','🙏','🌿','💛'], array['Hallow','DaySpring','Proverbs 31'],               5.0),
(4,  'Sofia Voss',      '@sofiavoss',          'Tech',             array['Tech','Comedy','Tutorial'],           '💻', '#161208', false, array['verified','topPerformer'],             '334K', '5.7%', 22, '$2,100', 2100, 'Tech reviewer and comedy creator blending honest product reviews with humor. Audience skews 18–34 tech-forward consumers.',                    array['💻','📱','🎮','🤖','⚙️','🔋'], array['Anker','Ridge','Notion'],                        4.8),
(5,  'Priya Nair',      '@priyanair.co',       'Wellness',         array['Aesthetic','UGC'],                   '🌿', '#0c1210', false, array['verified','fastDelivery'],             '203K', '7.1%', 17, '$1,400', 1400, 'Wellness and clean living creator focused on aesthetic UGC for health, beauty, and lifestyle brands.',                                          array['🌿','🧘','🍵','🌸','💚','🫧'], array['Ritual','Liquid IV','Alo Yoga'],                  4.9),
(6,  'Marcus Obi',      '@marcobi',            'Fitness',          array['Cinematic','Raw'],                   '🎯', '#180e08', false, array['verified','topPerformer'],             '178K', '9.3%', 11, '$1,600', 1600, 'Raw, cinematic fitness content creator. Known for authentic, documentary-style brand integration that converts.',                               array['🎯','🏋️','🥊','🔥','💯','⚡'], array['Gymshark','GHOST','Under Armour'],               4.8),
(7,  'Leila Karimi',    '@leilakarimi',        'Faith-Based',      array['Faith-Based','Lifestyle'],            '🌙', '#101018', false, array['verified','topPerformer'],             '142K', '10.1%', 7, '$800', 800,   'Faith and lifestyle creator building an engaged, values-driven community. Specialty in home, family, and intentional living.',                  array['🌙','🕯️','📿','🌺','☕','🏡'], array['Magnolia','Anthropologie','Grove Co.'],          5.0),
(8,  'Dev Sharma',      '@devsharma.dev',      'SaaS',             array['Tech','Tutorial','Educational'],      '⚡', '#141008', false, array['verified','topPerformer'],             '291K', '6.8%', 19, '$1,900', 1900, 'Developer and tech educator creating tutorial-style content for SaaS, productivity, and developer tools.',                                       array['⚡','🖥️','📊','🔧','🚀','🧑‍💻'], array['Figma','Linear','Vercel'],                      4.7),
(9,  'Aaliyah Brooks',  '@aaliyahbeauty',      'Skincare',         array['Unboxing','Testimonial','Aesthetic'], '✨', '#12080e', false, array['verified','fastDelivery'],             '167K', '8.8%', 12, '$1,200', 1200, 'Skincare and beauty creator known for honest testimonials and aesthetic unboxing content. Trusted by clean beauty brands for authentic first-impression reviews.', array['✨','🧴','💆','🌸','💅','🪷'], array['Fenty Beauty','CeraVe','Tatcha'],               4.9),
(10, 'Tyler Nash',      '@tylernash',          'Streetwear',       array['Cinematic','Lifestyle','Trending'],   '👟', '#0e0e12', false, array['verified'],                            '223K', '7.4%', 15, '$1,700', 1700, 'Streetwear and sneaker culture creator producing cinematic lifestyle content. Known for high-energy hauls, drops, and brand collabs that resonate with Gen Z.',    array['👟','🧢','🪡','🕶️','🎒','🔥'], array['New Balance','Supreme','KITH'],                 4.8),
(11, 'Emma Foster',     '@emmafoster.home',    'Home Decor',       array['Aesthetic','UGC','Storytelling'],     '🏡', '#10100c', false, array['verified'],                            '198K', '6.9%', 13, '$1,100', 1100, 'Home decor and interior styling creator specializing in aesthetic UGC and before-and-after transformations. Perfect for home goods, furniture, and lifestyle brands.', array['🏡','🪴','🛋️','🕯️','🖼️','☕'], array['IKEA','West Elm','Article'],                   4.7),
(12, 'Marcus Chen',     '@marcuschen.gg',      'Gaming',           array['Tutorial','Comedy','Trending'],       '🎮', '#0c0c14', false, array['verified','topPerformer'],             '445K', '5.2%', 24, '$2,200', 2200, 'Gaming and entertainment creator mixing tutorials with comedy. Massive reach in the 16–28 demographic for gaming peripherals, energy drinks, and tech accessories.', array['🎮','🕹️','🖥️','🎯','⚡','🏆'], array['Razer','G Fuel','HyperX'],                    4.6),
(13, 'Zara Williams',   '@zarawilliamseats',   'Food Content',     array['Aesthetic','Unboxing','Storytelling'],'🍽️', '#120e08', false, array['verified','topPerformer'],             '312K', '7.6%', 20, '$1,500', 1500, 'Food and beverage content creator known for visually stunning recipe content and aesthetic product integrations. Specialty in DTC food brands and kitchen products.', array['🍽️','🥘','🧁','🍷','🫙','🌶️'], array['HelloFresh','Graza','Le Creuset'],           4.9),
(14, 'James Okafor',    '@jamesokafor',        'Entrepreneurship', array['Storytelling','Educational','Testimonial'], '💼', '#0e1008', false, array['verified','topPerformer'],      '256K', '8.4%', 18, '$2,000', 2000, 'Entrepreneur and business creator building content around startup culture, productivity, and financial freedom. Trusted voice for B2B SaaS, fintech, and business tools.', array['💼','📈','🧠','💡','🚀','🎯'], array['Shopify','QuickBooks','Calendly'],           4.8),
(15, 'Nina Rodriguez',  '@ninarodriguez.re',   'Real Estate',      array['Testimonial','Educational','Storytelling'], '🏘️', '#100c08', false, array['verified','topPerformer','fastDelivery'], '134K', '9.7%', 8, '$1,300', 1300, 'Real estate and personal finance creator helping first-time buyers and investors navigate the market. High-trust audience ideal for mortgage, proptech, and investment platforms.', array['🏘️','🔑','📋','🏙️','💰','📊'], array['Zillow','Better.com','Roofstock'], 4.9),
(16, 'Sam Park',        '@sampark.brand',      'Personal Branding',array['Storytelling','Cinematic','Educational'], '🎬', '#08080e', false, array['verified','topPerformer'],        '188K', '8.1%', 10, '$1,650', 1650, 'Personal branding and content strategy creator helping entrepreneurs build their digital presence. Cinematic storytelling style with a focus on authenticity and positioning.', array['🎬','🎯','📸','✍️','🌟','💫'], array['Adobe Express','Canva','Squarespace'],      4.8);

select setval('creators_id_seq', (select max(id) from creators));

-- ── CREATOR REVIEWS ──────────────────────────────────────────────────────────

insert into creator_reviews (creator_id, brand, rating, review_text, review_date) values
-- Jordan Reeves (1)
(1, 'Apex Nutrition', 5, 'Jordan delivered exceptional content ahead of schedule. The hook in the first 3 seconds drove a 4.2x ROAS.', 'May 2025'),
(1, 'Nike Training',  5, 'Incredibly professional. Took the brief and elevated it. Will absolutely book again.', 'Mar 2025'),
(1, 'GNC',            4, 'Great energy and strong brand alignment. Minor revision needed on the CTA but resolved same day.', 'Jan 2025'),
-- Maya Chen (2)
(2, 'Revolve',        5, 'Maya''s aesthetic is unmatched. Our engagement on this campaign was the highest we''ve seen all year.', 'Jun 2025'),
(2, 'ZARA',           5, 'On-brand, on-time, and beautiful execution. Exactly what we needed for the launch.', 'Apr 2025'),
(2, 'Nordstrom',      4, 'Strong creative instincts. The final product looked stunning.', 'Feb 2025'),
-- Caleb St. James (3)
(3, 'Hallow',         5, 'Caleb understood our mission deeply. The content felt authentic and resonated powerfully with our audience.', 'May 2025'),
(3, 'DaySpring',      5, 'Rare find. Caleb brings genuine heart to every piece of content he creates.', 'Mar 2025'),
-- Sofia Voss (4)
(4, 'Notion',         5, 'Sofia''s audience is incredibly engaged. The video drove 3,200 sign-ups in the first 48 hours.', 'Jun 2025'),
(4, 'Anker',          5, 'Funny, smart, and effective. Our best-performing influencer campaign this quarter.', 'Apr 2025'),
(4, 'Ridge',          4, 'Great content. Sofia was easy to work with and delivered on brief.', 'Feb 2025'),
-- Priya Nair (5)
(5, 'Ritual',         5, 'Priya''s content perfectly captured the essence of our brand. High quality and very professional.', 'May 2025'),
(5, 'Alo Yoga',       5, 'Beautiful creative direction. Our community loved this campaign.', 'Mar 2025'),
(5, 'Liquid IV',      4, 'Solid delivery and great aesthetic. Would work with Priya again.', 'Jan 2025'),
-- Marcus Obi (6)
(6, 'Gymshark',       5, 'Marcus brings raw authenticity that our audience connects with immediately. Outstanding results.', 'Jun 2025'),
(6, 'GHOST',          5, 'Cinematic quality that made our product look incredible. High ROI campaign.', 'Apr 2025'),
(6, 'Under Armour',   4, 'Great energy and strong execution. Minor timing adjustments needed but final product was excellent.', 'Feb 2025'),
-- Leila Karimi (7)
(7, 'Magnolia',       5, 'Leila''s content is warm, genuine, and beautifully crafted. Perfect fit for our brand voice.', 'May 2025'),
(7, 'Grove Co.',      5, 'Highest engagement rate we''ve seen from any creator partnership. Will absolutely book again.', 'Mar 2025'),
-- Dev Sharma (8)
(8, 'Figma',          5, 'Dev''s tutorial format is perfect for our product. Clear, credible, and drives real conversions.', 'Jun 2025'),
(8, 'Linear',         5, 'Exceptional technical depth and audience trust. Our best-performing sponsored video ever.', 'Apr 2025'),
(8, 'Vercel',         4, 'Great creative and strong delivery. Dev is highly professional throughout the process.', 'Feb 2025'),
-- Aaliyah Brooks (9)
(9, 'Fenty Beauty',   5, 'Aaliyah''s testimonial style is incredibly persuasive. Our conversion rate from this campaign was exceptional.', 'Jun 2025'),
(9, 'CeraVe',         5, 'Authentic, relatable, and on-brand. She made our product feel like a must-have.', 'Apr 2025'),
(9, 'Tatcha',         4, 'Beautiful unboxing content. Delivered ahead of schedule with zero revisions needed.', 'Feb 2025'),
-- Tyler Nash (10)
(10, 'New Balance',   5, 'Tyler''s content captured exactly the energy we wanted. His audience is the perfect demographic.', 'May 2025'),
(10, 'Supreme',       5, 'Cinematic quality, authentic voice. This was our most-shared campaign of the season.', 'Mar 2025'),
(10, 'KITH',          4, 'Strong delivery and great brand fit. Tyler knows how to make product look aspirational.', 'Jan 2025'),
-- Emma Foster (11)
(11, 'West Elm',      5, 'Emma''s styling eye is extraordinary. She made our products look like they belong in a magazine.', 'Jun 2025'),
(11, 'IKEA',          4, 'Great creative direction and reliable delivery. Her audience is highly engaged with home content.', 'Apr 2025'),
(11, 'Article',       5, 'Emma brought our furniture to life in a way our own team couldn''t. Will absolutely collaborate again.', 'Feb 2025'),
-- Marcus Chen (12)
(12, 'Razer',         5, 'Marcus'' integration felt completely natural. His audience trusted the recommendation immediately.', 'Jun 2025'),
(12, 'G Fuel',        4, 'Great engagement and authentic delivery. His comedy style made the product memorable.', 'Apr 2025'),
(12, 'HyperX',        5, 'Top-tier gaming creator. The tutorial format drove significant traffic to our product page.', 'Feb 2025'),
-- Zara Williams (13)
(13, 'HelloFresh',    5, 'Zara''s food styling is incredible. The campaign drove our highest sign-up week of the year.', 'May 2025'),
(13, 'Graza',         5, 'She made our olive oil look like fine art. Authentic, beautiful, and highly effective.', 'Mar 2025'),
(13, 'Le Creuset',    5, 'Zara understands product storytelling at a deep level. Flawless execution every time.', 'Jan 2025'),
-- James Okafor (14)
(14, 'Shopify',       5, 'James'' storytelling approach drove genuine intent. His audience is exactly our target customer.', 'Jun 2025'),
(14, 'QuickBooks',    5, 'Credible, relatable, and persuasive. James made our product feel essential for any founder.', 'Apr 2025'),
(14, 'Calendly',      4, 'Solid campaign with strong message alignment. Educational format worked perfectly for our product.', 'Feb 2025'),
-- Nina Rodriguez (15)
(15, 'Zillow',        5, 'Nina''s educational approach builds incredible trust with her audience. Our sign-ups from this campaign were outstanding.', 'May 2025'),
(15, 'Better.com',    5, 'She breaks down complex topics in a way that actually converts. Highly recommend for fintech campaigns.', 'Mar 2025'),
(15, 'Roofstock',     4, 'Authentic and credible. Nina''s audience is highly engaged with real estate content.', 'Jan 2025'),
-- Sam Park (16)
(16, 'Adobe Express', 5, 'Sam''s storytelling is exactly what our brand needed. High production value and genuine enthusiasm for the product.', 'Jun 2025'),
(16, 'Canva',         5, 'Cinematic, polished, and authentic. Sam made Canva feel like a must-have creative tool.', 'Apr 2025'),
(16, 'Squarespace',   4, 'Great creative direction and strong brand alignment. Sam delivers a premium feel every time.', 'Feb 2025');

-- ── PAYMENTS ─────────────────────────────────────────────────────────────────

insert into payments (id, creator, campaign, amount, status, status_label) values
(1, 'Jordan Reeves',    'Summer Launch',    3500, 'held',     'Held in Escrow'),
(2, 'Maya Chen',        'Fall Collection',  1200, 'pending',  'Awaiting Delivery'),
(3, 'Caleb St. James',  'Faith Lifestyle',   850, 'held',     'Held in Escrow'),
(4, 'Sofia Voss',       'TechDrop Launch',  2200, 'released', 'Released');

select setval('payments_id_seq', (select max(id) from payments));

-- ── DEALS ────────────────────────────────────────────────────────────────────

insert into deals (id, brand, campaign, deliverable, budget, deadline, status) values
(1, 'Apex Nutrition',  'Summer Shred Series', 'TikTok Video',    1800, 'Jun 12', 'active'),
(2, 'Luxe Apparel Co.','Fall Drop Launch',    'Reel + UGC Ad',   2400, 'Jun 18', 'pending'),
(3, 'FocusFlow',       'Back to Grind',       'Product Photos',   650, 'Jun 22', 'active');

select setval('deals_id_seq', (select max(id) from deals));

-- ── CAMPAIGNS ────────────────────────────────────────────────────────────────

insert into campaigns (id, title, budget, status, applied, selected, deadline) values
(1, 'Summer Skincare Launch', '$1,200', 'Active',      8, 2, 'Apr 25, 2026'),
(2, 'Fitness App Promo',      '$800',   'In Progress', 5, 3, 'Apr 18, 2026'),
(3, 'Faith Lifestyle Series', '$500',   'Active',     12, 1, 'May 2, 2026');

select setval('campaigns_id_seq', (select max(id) from campaigns));

-- ── PRODUCTS ─────────────────────────────────────────────────────────────────

insert into products (id, title, creator, handle, category, tags, emoji, bg, price, sales, commission) values
(1, 'Cinematic LUT Pack Vol. 1', 'Jordan Reeves',    '@jordanreeves',      'Presets',   array['Video','Cinematic'],       '🎬', '#1a1208', 29, 312, 30),
(2, 'Content Creator OS',        'Maya Chen',        '@mayachen.creates',  'Templates', array['Notion','Productivity'],   '📋', '#10101a', 49, 841, 25),
(3, 'Faith-Led Brand Bible',     'Caleb St. James',  '@calebstjames',      'E-Book',    array['Branding','Faith'],        '📖', '#0e1410', 19, 204, 40),
(4, 'SaaS Launch Playbook',      'Sofia Voss',       '@sofiavoss',         'Course',    array['Tech','Strategy'],         '🚀', '#161208', 97, 128, 35),
(5, 'Wellness Brand Kit',        'Priya Nair',       '@priyanair.co',      'Templates', array['Canva','Wellness'],        '🌿', '#0c1210', 39, 567, 30),
(6, 'Raw Reels Preset Bundle',   'Marcus Obi',       '@marcobi',           'Presets',   array['Mobile','Raw'],            '📱', '#180e08', 24, 430, 30),
(7, 'Peaceful Living Guide',     'Leila Karimi',     '@leilakarimi',       'E-Book',    array['Lifestyle','Faith'],       '🌙', '#101018', 15, 189, 40),
(8, 'Dev Portfolio Masterclass', 'Dev Sharma',       '@devsharma.dev',     'Course',    array['Tech','Career'],           '⚡', '#141008', 79,  93, 35);

select setval('products_id_seq', (select max(id) from products));

-- ── CHATS ────────────────────────────────────────────────────────────────────

insert into chats (id, name, init, campaign, status, status_class, unread, revisions, max_revisions, preview) values
(1, 'Jordan Reeves',    'JR', 'Summer Launch · TikTok Video',    'In Review', 'status-review',  true,  1, 3, 'Uploaded the final cut...'),
(2, 'Maya Chen',        'MC', 'Fall Collection · UGC Ad',        'Active',    'status-active',  false, 0, 3, 'Can I adjust the deadline?'),
(3, 'Caleb St. James',  'CS', 'Faith Community · Lifestyle',     'In Review', 'status-review',  false, 2, 3, 'Revision 2 is ready'),
(4, 'Sofia Voss',       'SV', 'TechDrop Launch · TikTok',        'Active',    'status-active',  false, 0, 3, 'Excited to get started...');

select setval('chats_id_seq', (select max(id) from chats));

-- ── MESSAGES ─────────────────────────────────────────────────────────────────

insert into messages (chat_id, from_role, message_text, file_name, file_type, delivery, sent_time) values
-- Jordan Reeves chat (1)
(1, 'creator', 'Hey! I just uploaded the final cut for your review. Really happy with how it turned out.', null, null, false, '2:14 PM'),
(1, 'brand',   'Love the hook in the first 3 seconds. One ask: can you add a CTA overlay at the end?',     null, null, false, '2:31 PM'),
(1, 'creator', 'Absolutely, I''ll have that revision ready within the hour.',                               null, null, false, '2:33 PM'),
(1, 'creator', null, 'final_cut_v2.mp4', 'MP4', false, '3:07 PM'),
-- Maya Chen chat (2)
(2, 'brand',   'Hi Maya! Excited for this one. Brief is attached.',                                        null, null, false, 'Yesterday'),
(2, 'creator', 'Thank you! Can I adjust the deadline by 1 day? Want the lighting to be perfect.',          null, null, false, 'Yesterday'),
(2, 'brand',   'No problem — take the time you need.',                                                     null, null, false, 'Yesterday'),
-- Caleb St. James chat (3)
(3, 'creator', 'Revision 2 is ready! Incorporated all your feedback from round one.',                     null, null, false, '10:15 AM'),
(3, 'brand',   'This looks excellent. Sending for final approval now.',                                    null, null, false, '11:00 AM'),
(3, 'creator', null, 'lifestyle_rev2.mp4', 'MP4', true, '11:04 AM'),
-- Sofia Voss chat (4)
(4, 'brand',   'Sofia, product sample is on its way. Let us know when it arrives!',                        null, null, false, 'Mon'),
(4, 'creator', 'Sounds great, excited to get started on this one!',                                       null, null, false, 'Mon');

-- ── ANALYTICS ────────────────────────────────────────────────────────────────

insert into analytics_stats (label, value, delta) values
('Active Creators',    '284',   '+12 this week'),
('Live Campaigns',     '47',    '+8 vs last week'),
('GMV (MTD)',          '$38k',  '+24% MoM'),
('Platform Revenue',   '$15k',  '40% take rate'),
('Avg Deal Size',      '$809',  '+$112 MoM'),
('Subscription MRR',   '$3.1k', '284 × $10.99');

insert into analytics_monthly (month, gmv) values
('Aug', 12000),
('Sep', 16500),
('Oct', 21000),
('Nov', 28000),
('Dec', 33000),
('Jan', 38000);

insert into analytics_niches (label, pct) values
('Fitness', 28),
('Fashion', 23),
('Tech',    18),
('Faith',   15),
('Wellness', 10),
('Other',    6);

-- ── SUBSCRIPTION FEATURES ────────────────────────────────────────────────────

insert into subscription_features (label, monthly, annual) values
('Platform access & creator profile',      true,  true),
('Visibility in brand discovery feed',     true,  true),
('Unlimited campaign requests',            true,  true),
('In-platform messaging & file delivery',  true,  true),
('Earnings dashboard & analytics',         true,  true),
('Digital product listings (3 max)',       true,  true),
('Unlimited digital product listings',     false, true),
('Priority placement in discovery feed',   false, true),
('Featured creator badge',                 false, true),
('Early access to brand campaigns',        false, true),
('Advanced performance analytics',         false, true);

-- ── CREATOR PROFILE (logged-in creator dashboard) ────────────────────────────

insert into creator_profile (name, handle, niche, tags, emoji, reach, engagement, completed, streak, milestone, milestone_target, leaderboard_rank) values
('Jordan Reeves', '@jordanreeves', 'Fitness', array['UGC','Cinematic'], '🏋️', '248K', '6.4%', 14, 7, 14, 25, 12);

-- ── CREATOR EARNINGS ─────────────────────────────────────────────────────────

insert into creator_earnings (month, amount) values
('Mar', 2100),
('Apr', 3400),
('May', 2850),
('Jun', 4850);
