Config = {}

-- The command to open up the menu, set to false to disable this option
-- Available only for admins, they can use this command instead of tablet item
Config.command = 'heistcontracts'

-- The item to open up the menu
-- Everyone can use this item to enter the main menu
Config.tabletItem = 'contract_tablet'

-- The tablet menu locales are separate from the normal in-game locales
-- You can find them in web/dist/locales
Config.uiLanguage = 'en'

-- Default data for new users
-- A new user will start with this properties
Config.defaultData = {
    image = 'https://i.postimg.cc/Fsn60FxN/profile-icon-design-free-vector.jpg',
    coins = 0,
    xp = 0
}

-- The groups that can use /heistcontracts
Config.adminGroups = {
    ['admin'] = true,
    ['god'] = true
}

-- Accounts for paying
-- Used when paying for blackmarket items
Config.accounts = {
    'money',
    'bank'
}