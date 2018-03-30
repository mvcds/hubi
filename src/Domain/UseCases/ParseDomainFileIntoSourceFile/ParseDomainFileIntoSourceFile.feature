Feature: Parse Domain File Into Source
  As a developer
  I want to parse a domain file into a source one
  In order to have a useful file

  Scenario: Simple attribute
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

  Scenario: Short integer attribute
    Given "int.fixture" file
    When I run ParseDomainFileIntoSourceFile
    Then the atribute has type "integer"

  Scenario: Long integer attribute
    Given "integer.fixture" file
    When I run ParseDomainFileIntoSourceFile
    Then the atribute has type "integer"

  Scenario: Float attribute
    Given "float.fixture" file
    When I run ParseDomainFileIntoSourceFile
    Then the atribute has type "float"

  Scenario: Number attribute
    Given "number.fixture" file
    When I run ParseDomainFileIntoSourceFile
    Then the atribute has type "float"

  Scenario: Decimal attribute
    Given "decimal.fixture" file
    When I run ParseDomainFileIntoSourceFile
    Then the atribute has type "float"

  Scenario: Date attribute
    Given "date.fixture" file
    When I run ParseDomainFileIntoSourceFile
    Then the atribute has type "date"

  Scenario: JSON attribute
    Given "json.fixture" file
    When I run ParseDomainFileIntoSourceFile
    Then the atribute has type "json"

  Scenario: Object attribute
    Given "object.fixture" file
    When I run ParseDomainFileIntoSourceFile
    Then the atribute has type "object"

  Scenario: Shape attribute
    Given "shape.fixture" file
    When I run ParseDomainFileIntoSourceFile
    Then the atribute has type "object"
