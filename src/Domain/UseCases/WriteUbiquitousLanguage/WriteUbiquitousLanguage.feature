Feature: Write Ubiquitous Language
  As a use case
  I want translate domain files into source files
  In order to be able to use them

  Scenario Outline: Write Ubiquitous Language
    Given the <translator> translator
      And a pattern
      And some output
      And set target function
      And set write dependency
    When I call WriteUbiquitousLanguage
    Then the translation is written
      And translation was precise
      And write was invoked
      And a filePath was provided

    Examples:
      | translator |
      | "ubi" |
      | "log" |
      | "site" |
      | "joi" |
