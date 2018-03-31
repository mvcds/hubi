Feature: Parse Domain File Into Source
  As a developer
  I want to parse a domain file into a source one
  In order to have a useful file

  Scenario: Attribute is a simple string
    Given "simple" file
      And translator is ubi
    When I run ParseDomainFileIntoSourceFile
    Then the atribute has type "string"

  Scenario: Attribute is a typeless object
    Given "named" file
      And translator is ubi
    When I run ParseDomainFileIntoSourceFile
    Then the atribute has type "string"

  Scenario: Attribute is marked as required
    Given "required" file
      And translator is ubi
    When I run ParseDomainFileIntoSourceFile
    Then the atribute has type "string.required"

  Scenario: Attribute has attribute-specific values
    Given "array" file
      And translator is ubi
    When I run ParseDomainFileIntoSourceFile
    Then the atribute has type "[Person]"
