Feature: Uses Translator
  As a use case
  I want to select the correct translator
  In order to create it

  Scenario Outline: Known translator
    Given the <translator> translator
      And set writer
      And some output
      And a pen
    When I call UsesTranslator
    Then translation yield expected file

    Examples:
      | translator |
      | "ubi" |
      | "log" |
