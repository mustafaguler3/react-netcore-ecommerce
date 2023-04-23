using API.Data;
using API.Dtos;
using API.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class BasketController : BaseApiController
    {
        private readonly StoreContext _context;

        public BasketController(StoreContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<BasketDto>> GetBasket()
        {
            var basket = await RetrieveBasket();

            if (basket == null) return NotFound();

            return MapBasketToDto(basket);
        }        

        [HttpPost]
        public async Task<ActionResult<BasketDto>> AddItemToBasket(int productId,int quantity)
        {
            //get basket
            var basket = await RetrieveBasket();
            if (basket == null)
            {
                basket = CreateBasket();
            }
            //get product
            var product = await _context.Products.FindAsync(productId);
            if (product == null) return NotFound();
            //add item
            basket.AddItem(product,quantity);

            var result = await _context.SaveChangesAsync() > 0;

            if (result) return CreatedAtAction("GetBasket",MapBasketToDto(basket));

            return BadRequest(new ProblemDetails() { Title = "Problem saving item to basket" });
        }

        private Basket CreateBasket()
        {
            var buyerId = Guid.NewGuid().ToString();
            var cookieOptions = new CookieOptions
            {
                IsEssential = true,
                Expires = DateTime.Now.AddDays(30),
                HttpOnly = true,
            };
            Response.Cookies.Append("buyerId",buyerId, cookieOptions);

            var basket = new Basket
            {
                BuyerId = buyerId,
            };
            _context.Baskets.Add(basket);
            //_context.SaveChanges();
            return basket;
        }

        [HttpDelete]
        public async Task<ActionResult> RemoveBasketItem(int productId,int quantity)
        {
            //get basket
            var basket = await RetrieveBasket();
            if(basket == null) return NotFound();
            //remove item or reduce quantity
            basket.RemoveItem(productId, quantity);

            var result = await _context.SaveChangesAsync() > 0;
            if(result) return Ok();

            return BadRequest(new ProblemDetails() { Title = "Problem removing item from the basket" });
        }

        private static ActionResult<BasketDto> MapBasketToDto(Basket basket)
        {
            return new BasketDto
            {
                Id = basket.Id,
                BuyerId = basket.BuyerId,
                Items = basket.Items.Select(i => new BasketItemDto
                {
                    ProductId = i.ProductId,
                    Name = i.Product.Name,
                    Price = i.Product.Price,
                    PictureUrl = i.Product.PictureUrl,
                    Type = i.Product.Type,
                    Brand = i.Product.Brand,
                    Quantity = i.Quantity
                }).ToList()
            };
        }

        private async Task<Basket> RetrieveBasket()
        {
            return await _context.Baskets
                .Include(i => i.Items)
                .ThenInclude(p => p.Product)
                .FirstOrDefaultAsync(i => i.BuyerId == Request.Cookies["buyerId"]);
        }
    }
}
