Feature: Write Ubiquitous Language
  As a use case
  I want translate domain entities into source files
  In order to be able to use them

  Scenario Outline: Write Ubiquitous Language
    Given the <translator> translator
      And a pattern
      And some output
      And set writer
      And a pen
    When I call WriteUbiquitousLanguage
    Then writter is invoked
      And translation was precise
      And pen was used
      And a filePath was provided

    Examples:
      | translator |
      | "ubi" |
      | "log" |
