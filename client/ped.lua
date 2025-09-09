local Blackmarket = require 'config.data.blackmarket'

if not Blackmarket then return end

RegisterNUICallback('buy_item', function(itemName, cb)
    cb(1)

    local success, msg = lib.callback.await('paradox_contracts:buyItem', false, itemName)

    if success then
        LR.notify(msg, 'inform')
    elseif msg then
        LR.notify(msg, 'error')
    end
end)

---@todo fetch current count (after purchased)
RegisterNetEvent('paradox_contracts:updateItem', function(itemName)
    local item = Blackmarket.items[itemName]

    if not item or not item.count then return end

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