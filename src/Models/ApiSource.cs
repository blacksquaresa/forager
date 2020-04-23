namespace Forager.Data
{
  public class ApiSource
  {
    public int Id { get; set; }
    public string Name { get; set; }

    public static ApiSource FromSource(Source dataSource)
    {
      var source = new ApiSource()
      {
        Id = dataSource.Id,
        Name = dataSource.Name
      };
      return source;
    }
  }
}
