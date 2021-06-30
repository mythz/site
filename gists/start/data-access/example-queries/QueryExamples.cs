var dbFactory = HostContext.Resolve<IDbConnectionFactory>();
using var db = dbFactory.OpenDbConnection();

int year = DateTime.Today.AddYears(-20).Year;
db.Select<Author>(x => x.Birthday >= new DateTime(year,1,1)
                    && x.Birthday <= new DateTime(year,12,31));
                    
db.Select<Author>(x => Sql.In(x.City, "London","Madrid","Rome"))

db.Select<Author>(x => x.Earnings <= 50);

db.Select<Author>(x => x.Name.StartsWith("A"));

db.Select<Author>(x => x.Name.EndsWith("garzon"));

db.Select<Author>(x => x.Name.Contains("Benedict"));

//implicit Server SQL string casting
db.Select<Author>(x => x.Rate.ToString() == "10"); 

//Server SQL string concatenation
db.Select<Author>(x => "Rate " + x.Rate == "Rate 10"); 
