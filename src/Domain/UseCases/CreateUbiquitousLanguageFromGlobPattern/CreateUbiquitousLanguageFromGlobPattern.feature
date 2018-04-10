Feature: Create Ubiquitous Language From Glob Pattern
  As a developer
  I want to define domain files
  In order create an ubiquitous language

  Scenario: Referenceless token
    Given a pattern to "file"
    When I run CreateUbiquitousLanguageFromGlobPattern
    Then the glob pattern is read
      And the token "file" has 0 dependencies
      And the token "file" has 0 dependents

  Scenario: Missing referenced token
    Given a pattern to "computer"
    When I run CreateUbiquitousLanguageFromGlobPattern
    Then the glob pattern is read
      And the token "computer" has 0 dependencies
      And the token "computer" has 0 dependents

  Scenario Outline: Simple references
    Given a pattern to <first>
      And a pattern to <second>
      And a pattern to <third>
    When I run CreateUbiquitousLanguageFromGlobPattern
    Then the glob pattern is read
      And the token "engine" has 0 dependencies
      And the token "car" has 1 dependencies
      And the token "driver" has 2 dependencies
      And the token "driver" has 0 dependents
      And the token "car" has 1 dependents
      And the token "engine" has 2 dependents

    Examples:
      | first | second | third |
      | "engine" | "car" | "driver" |
      | "engine" | "driver" | "car" |
      | "car" | "engine" | "driver" |
      | "car" | "driver" | "engine" |
      | "driver" | "engine" | "car" |
      | "driver" | "car" | "engine" |
