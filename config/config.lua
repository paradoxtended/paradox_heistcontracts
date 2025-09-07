Config = {}

-- The command to open up the menu
-- Available only for admins, they can use this command instead of tablet item
Config.command = 'heistcontracts'

-- The item to open up the menu
-- Everyone can use this item to enter the main menu
Config.tabletItem = 'contract_tablet'

-- The tablet menu locales are separate from the normal in-game locales
-- You can find them in web/dist/locales
Config.uiLanguage = 'en'

-- Default spawn radius for entities
Config.defaultRadius = 100.0

-- The groups that can use /jobscreator, /uncuff, /edit
Config.adminGroups = {
    ['admin'] = true,
    ['god'] = true
}