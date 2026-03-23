-- =============================================
-- SUPABASE SCHEMA FOR PORTFOLIO DASHBOARD
-- Paste this entire file into Supabase SQL Editor and click "Run"
-- =============================================

-- 1. Site Sections (key-value store for portfolio content)
CREATE TABLE IF NOT EXISTS site_sections (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL DEFAULT '{}',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. Messages (from contact form)
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name TEXT NOT NULL,
  last_name TEXT DEFAULT '',
  email TEXT NOT NULL,
  phone TEXT DEFAULT '',
  service TEXT DEFAULT '',
  body TEXT NOT NULL,
  read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. Message Replies
CREATE TABLE IF NOT EXISTS message_replies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  message_id UUID NOT NULL REFERENCES messages(id) ON DELETE CASCADE,
  body TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- =============================================
-- ROW LEVEL SECURITY
-- =============================================

ALTER TABLE site_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE message_replies ENABLE ROW LEVEL SECURITY;

-- Site Sections: anyone can read, only authenticated can write
CREATE POLICY "Public can read site_sections"
  ON site_sections FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated can insert site_sections"
  ON site_sections FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated can update site_sections"
  ON site_sections FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Messages: anyone can insert (contact form), authenticated can read/update/delete
CREATE POLICY "Public can insert messages"
  ON messages FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated can read messages"
  ON messages FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated can update messages"
  ON messages FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated can delete messages"
  ON messages FOR DELETE
  TO authenticated
  USING (true);

-- Message Replies: only authenticated
CREATE POLICY "Authenticated can insert message_replies"
  ON message_replies FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated can read message_replies"
  ON message_replies FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated can delete message_replies"
  ON message_replies FOR DELETE
  TO authenticated
  USING (true);

-- =============================================
-- SEED DEFAULT DATA
-- =============================================

INSERT INTO site_sections (key, value) VALUES
('hero', '{
  "name": "Mustafa Ali",
  "subtitle": "Software Developer",
  "description": "I excel at crafting elegant digital experiences and I am proficient in various programming languages and technologies. I specialize in building responsive, high-performance web applications that seamlessly blend beautiful design with robust logic.",
  "photoUrl": "/assets/Mustafa Image.jpeg",
  "socialLinks": [
    {"iconKey": "github", "href": "https://github.com", "label": "GitHub"},
    {"iconKey": "linkedin", "href": "https://linkedin.com", "label": "LinkedIn"},
    {"iconKey": "youtube", "href": "https://youtube.com", "label": "YouTube"},
    {"iconKey": "twitter", "href": "https://twitter.com", "label": "Twitter"}
  ]
}'::jsonb),

('stats', '[
  {"value": 12, "label": "Years of\nexperience"},
  {"value": 26, "label": "Projects\ncompleted"},
  {"value": 8, "label": "Technologies\nmastered"},
  {"value": 500, "label": "Code\ncommits"}
]'::jsonb),

('services', '[
  {"num": "01", "title": "Web Development", "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque consequat, faucibus et, et.", "href": "/contact"},
  {"num": "02", "title": "UI/UX Design", "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque consequat, faucibus et, et.", "href": "/contact"},
  {"num": "03", "title": "Logo Design", "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque consequat, faucibus et, et.", "href": "/contact"},
  {"num": "04", "title": "SEO", "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque consequat, faucibus et, et.", "href": "/contact"}
]'::jsonb),

('projects', '[
  {"num": "01", "category": "frontend", "title": "Frontend Project", "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque consequat, faucibus et, et.", "stack": [{"name": "Html 5"}, {"name": "Css 3"}, {"name": "Javascript"}], "image": "/assets/work/thumb1.png", "live": "", "github": ""},
  {"num": "02", "category": "fullstack", "title": "Fullstack Project", "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque consequat, faucibus et, et.", "stack": [{"name": "Next.js"}, {"name": "Tailwind.css"}, {"name": "Node.js"}], "image": "/assets/work/thumb2.png", "live": "", "github": ""},
  {"num": "03", "category": "ui/ux", "title": "UI/UX Project", "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque consequat, faucibus et, et.", "stack": [{"name": "Figma"}, {"name": "Framer"}], "image": "/assets/work/thumb3.png", "live": "", "github": ""}
]'::jsonb),

('resume', '{
  "aboutTitle": "About me",
  "aboutDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque consequat, faucibus et, et.",
  "aboutInfo": [
    {"fieldName": "Name", "fieldValue": "Mustafa Ali"},
    {"fieldName": "Experience", "fieldValue": "12+ Years"},
    {"fieldName": "Nationality", "fieldValue": "Egyptian"},
    {"fieldName": "Freelance", "fieldValue": "Available"},
    {"fieldName": "Skype", "fieldValue": "mustafa.01"},
    {"fieldName": "Languages", "fieldValue": "Arabic, English"}
  ],
  "experienceTitle": "My experience",
  "experienceDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque consequat, faucibus et, et.",
  "experienceItems": [
    {"company": "Tech Solutions Inc.", "position": "Full Stack Developer", "duration": "2022 - Present"},
    {"company": "Web Design Studio", "position": "Front-End Developer Intern", "duration": "Summer 2021"},
    {"company": "E-commerce Startup", "position": "Freelance Web Developer", "duration": "2020 - 2021"},
    {"company": "Tech Academy", "position": "Teaching Assistant", "duration": "2019 - 2020"},
    {"company": "Digital Agency", "position": "UI/UX Designer", "duration": "2018 - 2019"},
    {"company": "Software House", "position": "Junior Developer", "duration": "2017 - 2018"}
  ],
  "educationTitle": "My education",
  "educationDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque consequat, faucibus et, et.",
  "educationItems": [
    {"institution": "Online Course Platform", "degree": "Full Stack Web Development Bootcamp", "duration": "2023"},
    {"institution": "Codecademy", "degree": "Front-end Track", "duration": "2022"},
    {"institution": "Online Course", "degree": "Programming Course", "duration": "2020 - 2021"},
    {"institution": "Tech Institute", "degree": "Certified Web Developer", "duration": "2019"}
  ],
  "skillsTitle": "My skills",
  "skillsDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque consequat, faucibus et, et.",
  "skillsList": [
    {"iconKey": "html", "name": "HTML 5"},
    {"iconKey": "css", "name": "CSS 3"},
    {"iconKey": "js", "name": "JavaScript"},
    {"iconKey": "react", "name": "React.js"},
    {"iconKey": "next", "name": "Next.js"},
    {"iconKey": "tailwind", "name": "Tailwind CSS"},
    {"iconKey": "node", "name": "Node.js"},
    {"iconKey": "figma", "name": "Figma"}
  ]
}'::jsonb),

('contactInfo', '[
  {"iconKey": "phone", "title": "Phone", "description": "(+20) 123 456 7890"},
  {"iconKey": "email", "title": "Email", "description": "mustafa@gmail.com"},
  {"iconKey": "address", "title": "Address", "description": "Code Corner, Tech Town 13579"}
]'::jsonb),

('settings', '{
  "siteTitle": "Mustafa Ali — Software Developer",
  "siteDescription": "Portfolio of Mustafa Ali — Software Developer specializing in elegant digital experiences.",
  "accentColor": "#00aaff",
  "logoText": "Mustafa"
}'::jsonb)

ON CONFLICT (key) DO NOTHING;
