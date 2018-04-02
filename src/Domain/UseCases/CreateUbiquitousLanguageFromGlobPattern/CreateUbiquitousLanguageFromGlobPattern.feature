Feature: Create Ubiquitous Language From Glob Pattern
  As a developer
  I want to define domain files
  In order create an ubiquitous language

  Scenario: Referenceless entity
    Given a pattern to "file"
    When I run CreateUbiquitousLanguageFromGlobPattern
    Then the glob pattern is read
      And the entity "File" has 0 dependencies

  Scenario Outline: Simple references
    Given a pattern to <first>
      And a pattern to <second>
      And a pattern to <third>
    When I run CreateUbiquitousLanguageFromGlobPattern
    Then the glob pattern is read
      And the entity "Engine" has 0 dependencies
      And the entity "Car" has 1 dependencies
      And the entity "Driver" has 2 dependencies

    Examples:
      | first | second | third |
      | "engine" | "car" | "driver" |
      | "engine" | "driver" | "car" |
      | "car" | "engine" | "driver" |
      | "car" | "driver" | "engine" |
      | "driver" | "engine" | "car" |
      | "driver" | "car" | "engine" |
