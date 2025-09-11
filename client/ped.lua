local Blackmarket = require 'config.data.blackmarket'

if not Blackmarket then return end

local function recieveOrder()
    ---@type table<string, boolean>
    local items = lib.callback.await('paradox_contracts:getOrderedItems', false)

    if not items then
        LR.notify(locale('havent_ordered'), 'error')
        return
    end

    local options = {}

    for itemName, _ in pairs(items) do
        local item = Blackmarket.items[itemName]
        table.insert(options, {
            title = Utils.getItemLabel(itemName),
            description = (type(item.price) == 'number' or (item.price.money and not item.price.coins)) and locale('item_description3', item.price)
                    or item.price.coins and locale('item_description2', item.price.coins)
                    or (item.price.money and item.price.coins) and locale('item_description', item.price.money, item.price.coins),
            icon = Editable.getInventoryIcon(itemName),
            image = Editable.getInventoryIcon(itemName),
            onSelect = recieve,
            args = itemName
        })
    end

    lib.registerContext({
        id = 'paradox_contracts:recieveMenu',
        title = locale('recieve_order'),
        options = options
    })

    lib.showContext('paradox_contracts:recieveMenu')
end

RegisterNUICallback('buy_item', function(itemName, cb)
    cb(1)

    local success, msg = lib.callback.await('paradox_contracts:buyItem', false, itemName)

    if success then
        LR.notify(msg, 'inform')
    elseif msg then
        LR.notify(msg, 'error')
    end
end)

RegisterNetEvent('paradox_contracts:updateItem', function(itemName, count)
    local item = Blackmarket.items[itemName]

    if not item or not item.count then return end

    item.count = count

    SendNUIMessage({
        action = 'update_items',
        data = {
            name = itemName,
            count = item.count
        }
    })
end)

for _, coords in ipairs(Blackmarket.locations) do
    local models = Blackmarket.models

    if type(models) == 'string' then
        models = { models } ---@cast models string[]
    end

    local model = Utils.randomFromTable(models)

    Utils.createPed(coords, model, {
        {
            label = locale('recieve_order'),
            icon = 'file-lines',
            onSelect = recieveOrder
        },
        {
            label = locale('sell_items'),
            icon = 'dollar-sign',
            onSelect = sellItems
        }
    })
end