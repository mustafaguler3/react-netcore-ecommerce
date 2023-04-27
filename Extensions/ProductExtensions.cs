using API.Entities;

namespace API.Extensions
{
    public static class ProductExtensions
    {
        public static IQueryable<Product> Sort(this IQueryable<Product> query,string orderBy)
        {
            if(string.IsNullOrWhiteSpace(orderBy)) return query.OrderBy(i=>i.Name);

            query = orderBy switch
            {
                "price" => query.OrderBy(i => i.Price),
                "priceDesc" => query.OrderByDescending(i => i.Price),
                _ => query.OrderBy(i => i.Name)
            };

            return query;
        }

        public static IQueryable<Product> Search(this IQueryable<Product> query, string searchTerm)
        {
            if (string.IsNullOrWhiteSpace(searchTerm)) return query;

            var lowerCaseSearchTerm = searchTerm.Trim().ToLower();

            return query.Where(i=>i.Name.ToLower().Contains(lowerCaseSearchTerm));
        }

        public static IQueryable<Product> Filter(this IQueryable<Product> query, string brands,string types)
        {
            var brandList = new List<string>();
            var typeList = new List<string>();

            if (!string.IsNullOrEmpty(brands)) brandList.AddRange(brands.ToLower().Split(",").ToList());

            if (!string.IsNullOrEmpty(types)) typeList.AddRange(types.ToLower().Split(",").ToList());

            query = query.Where(i => brandList.Count() == 0 || brandList.Contains(i.Brand.ToLower()));

            query = query.Where(i => typeList.Count() == 0 || typeList.Contains(i.Type.ToLower()));

            return query;
        }
    }
}
