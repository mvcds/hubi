Feature: Create Ubiquitous Language From Glob Pattern
  As a developer
  I want to define domain files
  In order create an ubiquitous language

  Scenario: Referenceless entity
    Given a pattern to "file"
    When I run CreateUbiquitousLanguageFromGlobPattern
    Then the glob pattern is read
      And the entity "file" has 0 dependencies
      And the entity "file" has 0 dependents

  Scenario Outline: Simple references
    Given a pattern to <first>
      And a pattern to <second>
      And a pattern to <third>
    When I run CreateUbiquitousLanguageFromGlobPattern
    Then the glob pattern is read
      And the entity "engine" has 0 dependencies
      And the entity "car" has 1 dependencies
      And the entity "driver" has 2 dependencies
      And the entity "driver" has 0 dependents
      And the entity "car" has 1 dependents
      And the entity "engine" has 2 dependents

    Examples:
      | first | second | third |
      | "engine" | "car" | "driver" |
      | "engine" | "driver" | "car" |
      | "car" | "engine" | "driver" |
      | "car" | "driver" | "engine" |
      | "driver" | "engine" | "car" |
      | "driver" | "car" | "engine" |
