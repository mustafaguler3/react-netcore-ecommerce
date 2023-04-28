using API.RequestHelpers;
using System.Text.Json;

namespace API.Extensions
{
    public static class HttpExtentions
    {
        public static void AddPaginationHeader(this HttpResponse response,MetaData metaData)
        {
            var options = new JsonSerializerOptions
            {
                PropertyNamingPolicy= JsonNamingPolicy.CamelCase,
            };
            response.Headers.Add("pagination", JsonSerializer.Serialize(metaData,options));
            response.Headers.Add("Access-Control-Expose-Headers", "Pagination");
        }
    }
}
