# Data Model

This document will describe the data model, which is intended to be used in Entity Framework. This will define the database structure, and the interface between the application (API) and the data.

```mermaid
classDiagram
class Family {
  +int Id
  +string Name
}
class User {
  +int Id
  +string Name
  +Family Family
}
class List {
  +int Id
  +string Name
  +Family Family
}
class ListItem {
  +int Id
  +string Name
  +List List
  +Variant[] Variants
  +int Quantity
  +string Units
}
class Source {
  +int Id
  +string Name
}
class Recipe {
  +int Id
  +string Name
}
class Ingredient {
  +int Id
  +string Name
  +Recipe Recipe
  +int Quantity
  +string Units
  +Product Product
}
class Product {
  +int Id
  +string Name
  +string Description
}
class Variant {
  +int Id
  +string Name
  +Product Product
  +Source[] Sources
  +int Quantity
  +string Units
  +string Description
  +string ImagePath
  +PackagingType PackagingType
}
class PackagingType {
  <<enumeration>>
  Plastic
  Paper
  Metal
}
User --> Family
List --> Family
ListItem --> List
ListItem --> Variant
Ingredient --> Recipe
Ingredient --> Product
Variant --> Product
Variant --> Source
Variant --> PackagingType
```
