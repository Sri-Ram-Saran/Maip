using NetTopologySuite.Geometries;

namespace Maip.Api.Models;

public class SpatialResult
{
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public double Latitude { get; set; }
    public double Longitude { get; set; }
    public string Type { get; set; } = "POI"; // Point of Interest
    public double Distance { get; set; } // Distance from search center
    public bool IsNear { get; set; } // Categorized as 'Near' or 'Far'
}
