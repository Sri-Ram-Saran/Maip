using NetTopologySuite.Geometries;
using Maip.Api.Models;

namespace Maip.Api.Services;

public class SpatialService
{
    private readonly GeometryFactory _geometryFactory = new(new PrecisionModel(), 4326);

    public List<SpatialResult> ProcessResults(List<SpatialResult> rawResults, double centerLat, double centerLng, double nearRadiusKm = 2.0)
    {
        var centerPoint = _geometryFactory.CreatePoint(new Coordinate(centerLng, centerLat));

        foreach (var result in rawResults)
        {
            var point = _geometryFactory.CreatePoint(new Coordinate(result.Longitude, result.Latitude));
            // Very basic distance calculation for demo (should use Haversine or NetTopologySuite's Distance if projected)
            result.Distance = CalculateDistance(centerLat, centerLng, result.Latitude, result.Longitude);
            result.IsNear = result.Distance <= nearRadiusKm;
        }

        return rawResults.OrderBy(r => r.Distance).ToList();
    }

    private double CalculateDistance(double lat1, double lon1, double lat2, double lon2)
    {
        var R = 6371; // Earth radius in km
        var dLat = ToRadians(lat2 - lat1);
        var dLon = ToRadians(lon2 - lon1);
        var a = Math.Sin(dLat / 2) * Math.Sin(dLat / 2) +
                Math.Cos(ToRadians(lat1)) * Math.Cos(ToRadians(lat2)) *
                Math.Sin(dLon / 2) * Math.Sin(dLon / 2);
        var c = 2 * Math.Atan2(Math.Sqrt(a), Math.Sqrt(1 - a));
        return R * c;
    }

    private double ToRadians(double deg) => deg * (Math.PI / 180);
}
