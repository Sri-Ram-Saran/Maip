using System.Text;
using System.Text.Json;

namespace Maip.Api.Services;

public class GeminiService
{
    private readonly string? _apiKey;
    private readonly HttpClient _httpClient;

    public GeminiService(IConfiguration configuration)
    {
        _apiKey = configuration["Gemini:ApiKey"];
        _httpClient = new HttpClient();
    }

    public async Task<string> RefineSearchAsync(string userQuery)
    {
        if (string.IsNullOrEmpty(_apiKey)) return userQuery;

        var endpoint = $"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={_apiKey}";
        
        var requestBody = new
        {
            contents = new[]
            {
                new { parts = new[] { new { text = $"The user is searching a map with this query: '{userQuery}'. Identify the core intent and suggest 3-5 specific keywords or categories to search for in a spatial database (e.g., 'quiet', 'park', 'cafe'). Return only a comma-separated list of terms." } } }
            }
        };

        try
        {
            var response = await _httpClient.PostAsync(endpoint, new StringContent(JsonSerializer.Serialize(requestBody), Encoding.UTF8, "application/json"));
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync();
                using var doc = JsonDocument.Parse(content);
                var text = doc.RootElement
                    .GetProperty("candidates")[0]
                    .GetProperty("content")
                    .GetProperty("parts")[0]
                    .GetProperty("text")
                    .GetString();
                
                return text?.Trim() ?? userQuery;
            }
        }
        catch
        {
            // Silently fail and return original query
        }

        return userQuery;
    }
}
