---@type Blackmarket
-- The line above is mandatory, otherwise the blackmarket won't get parsed
return {
    models = {
        `mp_m_weapwork_01`
    },
    locations = {
        vector4(695.9141, -960.0654, 23.9861, 93.0559)
    },
    items = {
        ['weapon_pistol'] = { 
            label = Utils.getItemLabel('weapon_pistol'),
            description = 'A reliable handgun for self-defense and tactical operations.',
            imageUrl = Editable.getInventoryIcon('weapon_pistol'),
            price = { coins = 500, money = 12500 }
        }
    }
}