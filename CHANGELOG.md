# Changelog

All notable changes to the Manhattan Chicago Pizza website will be documented in this file.

## [Unreleased]

### Added
- Created Spanish-speaking restaurant chatbot "Machi"
- Implemented chatbot with chef emoji avatar and bilingual support
- Added comprehensive pizza knowledge base with menu information
- Integrated chatbot.png as the bot avatar icon
- Updated menu page with new menu images

### Changed
- Updated chatbot avatar from pizza emoji to chef emoji
- Renamed bot from generic chatbot to "Machi"
- Added Spanish language greetings and responses
- Fixed chatbot.png file reference (corrected case sensitivity)
- Removed Gainesville location from the website as it no longer exists
- Updated menu section to only show Pinecrest location
- Removed Gainesville option from the mailing list form
- Replaced outdated menu background with a professional food image from Pexels
- Enhanced menu images with improved styling, shadows, and hover effects
- Improved responsiveness of menu section on all device sizes
- Repositioned ORDER ONLINE button below menu heading for better mobile UX
- Reduced excess padding and optimized layout for mobile devices
- Improved text contrast with dark background for better readability
- Removed redundant "ORDER ONLINE" section from menu page to eliminate duplication

### Technical
- Removed problematic ES6 module import causing JavaScript syntax errors
- Updated CSS avatar background image reference
- Moved chatbot.png to public directory for proper web serving
- Fixed file path references in chatbot.html

### Features
- Bilingual support (English/Spanish)
- Menu information (Deep dish, NY style, calzones, appetizers, etc.)
- Business information (hours, location, contact)
- Special deals and promotions
- Dietary information and popular items
- Interactive quick question buttons

## [Latest] - 2024-12-20

### Added
- **Late-Night Delivery System**: Added dedicated late-night ordering functionality for orders after 10PM
  - New button in store hours section with clear messaging
  - Confirmation popup explaining driver availability until 10PM
  - Opens special late-night menu at https://order.online/business/manhattan-chicago-pizzeria-47610 in new tab
  - Provides phone number (786) 581-9240 as alternative ordering method

### Changed
- **Store Hours Extended**: Updated operating hours to reflect new schedule
  - Monday-Saturday: 11:00 AM - 3:00 AM (previously varied ending times)
  - Sunday: 12:00 PM - 2:00 AM (previously 12:00 PM - 9:00 PM)
- **ORDER ONLINE Button Fixes**: All ORDER ONLINE buttons now correctly point to working menu
  - Updated from broken store selection page to https://www.manhattanchicagopizzeria.com/
  - Fixed navigation menu links to use working menu URL
  - Removed broken Georgia location references
- **Late-Night Popup Message**: Simplified confirmation message to remove phone call option
  - Updated to: "Our main drivers are available only until 10PM. Please use the Late Night ordering button for delivery orders."
  - Streamlined user experience by focusing on the online ordering option

### Fixed
- **Late-Night Button Positioning**: Moved late-night delivery button from hero section to store hours section to avoid chatbot overlap
- **Iframe Embedding Issue**: Changed late-night menu from iframe modal to new tab due to X-Frame-Options restrictions
- **Accessibility**: Added proper rel="noopener" attributes to external links and aria-labels to video buttons
- **Link Corrections**: Removed broken order.online link from hero section

### Updated
- **Knowledge Base**: Updated menu_knowledge.md with new hours and late-night delivery process
- **User Experience**: Improved messaging and button placement for better customer understanding