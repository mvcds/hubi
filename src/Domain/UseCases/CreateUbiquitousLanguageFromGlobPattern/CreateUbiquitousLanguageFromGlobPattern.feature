Feature: Create Ubiquitous Language From Glob Pattern
  As a developer
  I want to define domain files
  In order create an ubiquitous language

  Scenario: Referenceless entity
    Given a pattern to "file"
    When I run CreateUbiquitousLanguageFromGlobPattern
    Then the glob pattern is read
