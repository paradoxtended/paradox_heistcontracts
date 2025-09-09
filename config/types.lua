---@class User
---@field isAdmin boolean
---@field data { name: string, image: string }
---@field stats { coins: number, xp: number, completedContracts: number, firstLogged: string | osdate }

---@class BlackmarketItem
---@field count number? Amount in stock
---@field price { money?: number, coins?: number } | number? If price is number then it'll be considered as money
---@field description string?
---@field image string?
---@field label string

---@class Blackmarket
---@field models string | string[] Dealer ped's model
---@field locations vector4[]
---@field items table<string, BlackmarketItem>