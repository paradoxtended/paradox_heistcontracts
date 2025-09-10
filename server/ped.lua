local Blackmarket = require 'config.data.blackmarket'

if not Blackmarket then return end

---@type table<string, table<string, boolean>>
local stockOrders = {}

---@param source number
---@param itemName string
lib.callback.register('paradox_contracts:buyItem', function(source, itemName)
    local player = Framework.getPlayerFromId(source)
    local item = Blackmarket.items[itemName]

    if not player or not item then return end

    local identifier = player:getIdentifier()

    if stockOrders[identifier] and stockOrders[identifier][itemName] then
        return false, locale('item_already_ordered')
    end

    local user = GetUserData(player)

    if item.price then
        local price = item.price
        
        if type(price) == 'number' and (player:getAccountMoney('money') < price and player:getAccountMoney('bank') < price) then
            return false, locale('not_enough_money')
        elseif type(price) == 'table' and price.coins and user.stats.coins < price.coins then
            return false, locale('not_enough_coins')
        elseif type(price) == 'table' and price.money and (player:getAccountMoney('money') < price.money and player:getAccountMoney('bank') < price.money) then
            return false, locale('not_enough_money')
        end
    end

    if item.count then
        if item.count <= 0 then
            return false, locale('out_of_stock')
        else
            item.count = item.count - 1
        end
    end

    TriggerClientEvent('paradox_contracts:updateItem', -1, itemName, item.count)

    if not stockOrders[identifier] then 
        stockOrders[identifier] = {} 
    end

    stockOrders[identifier][itemName] = true

    return true, locale('item_ordered')
end)

lib.callback.register('paradox_contracts:fetchBlackmarket', function()
    return Blackmarket
end)