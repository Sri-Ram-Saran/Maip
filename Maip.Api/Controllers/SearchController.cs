using Microsoft.AspNetCore.Mvc;
using Maip.Api.Services;
using Maip.Api.Models;

namespace Maip.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SearchController : ControllerBase
{
    private readonly SpatialService _spatialService;
    private readonly GeminiService _geminiService;

    public SearchController(SpatialService spatialService, GeminiService geminiService)
    {
        _spatialService = spatialService;
        _geminiService = geminiService;
    }

    [HttpGet]
    public async Task<ActionResult<List<SpatialResult>>> Search([FromQuery] string query, [FromQuery] double lat, [FromQuery] double lng)
    {
        // 1. Refine query with Gemini
        var refinedTerms = await _geminiService.RefineSearchAsync(query);
        
        // 2. Mock Data (In a real app, this would query OSM or SQL Server)
        var mockResults = new List<SpatialResult>
        {
            new() { Name = "Cubbon Park", Description = "Large green park", Latitude = 12.9734, Longitude = 77.5913, Type = "Park" },
            new() { Name = "Vidyarthi Bhavan", Description = "Famous Dosa place", Latitude = 12.9451, Longitude = 77.5744, Type = "Cafe" },
            new() { Name = "Blossom Book House", Description = "Iconic bookstore", Latitude = 12.9752, Longitude = 77.6061, Type = "Store" },
            new() { Name = "Nandi Hills", Description = "Hill station (Far)", Latitude = 13.3702, Longitude = 77.6835, Type = "Nature" }
        };

        // 3. Process with Spatial Logic
        var processed = _spatialService.ProcessResults(mockResults, lat, lng);

        return Ok(processed);
    }
}
