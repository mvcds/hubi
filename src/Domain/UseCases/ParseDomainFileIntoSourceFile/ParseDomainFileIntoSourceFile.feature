Feature: Parse Domain File Into Source
  As a developer
  I want to parse a domain file into a source one
  In order to have a useful file

  Scenario: Simbple attribute
    Given "simple.fixture" file
    When I run ParseDomainFileIntoSourceFile
    Then the atribute has type "string"

  Scenario: Named attribute
    Given "named.fixture" file
    When I run ParseDomainFileIntoSourceFile
    Then the atribute has type "string"

  Scenario: Required attribute
    Given "required.fixture" file
    When I run ParseDomainFileIntoSourceFile
    Then the atribute has type "string.required"

  Scenario: String attribute
    Given "string.fixture" file
    When I run ParseDomainFileIntoSourceFile
    Then the atribute has type "string"

  Scenario: Short boolean attribute
    Given "bool.fixture" file
    When I run ParseDomainFileIntoSourceFile
    Then the atribute has type "boolean"

  Scenario: Long boolean attribute
    Given "boolean.fixture" file
    When I run ParseDomainFileIntoSourceFile
    Then the atribute has type "boolean"
