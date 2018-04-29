Feature: Save Ubiquitous Language Into File
  As a use case
  I want translate domain files into source files
  In order to be able to use them

  Scenario Outline: Save Ubiquitous Language Into File
    Given the <translator> translator
      And a pattern
      And some output
      And set write dependency
    When I call SaveUbiquitousLanguageIntoFile
    Then the translation is written
      And translation was precise

    Examples:
      | translator |
      | "ubi" |
      | "log" |
      | "site" |
      | "joi" |
