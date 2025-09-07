lib.locale()

Utils = {}

local labels = {}

lib.callback('paradox_contracts:getItemLabels', false, function(data)
    labels = data
end)

---@param name string
---@diagnostic disable-next-line: duplicate-set-field
function Utils.getItemLabel(name)
    return labels[name] or labels[name:upper()] or 'ITEM_NOT_FOUND'
end