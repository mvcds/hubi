Feature: Parse Domain File Into Source
  As a developer
  I want to parse a domain file into a source one
  In order to have a useful file

  Scenario: Simple attribute
    Given "simple.fixture" file
      And translator is ubi
    When I run ParseDomainFileIntoSourceFile
    Then the atribute has type "string"

  Scenario: Named attribute
    Given "named.fixture" file
      And translator is ubi
    When I run ParseDomainFileIntoSourceFile
    Then the atribute has type "string"

  Scenario: Required attribute
    Given "required.fixture" file
      And translator is ubi
    When I run ParseDomainFileIntoSourceFile
    Then the atribute has type "string.required"

  Scenario: String attribute
    Given "string.fixture" file
      And translator is ubi
    When I run ParseDomainFileIntoSourceFile
    Then the atribute has type "string"

  Scenario: Short boolean attribute
    Given "bool.fixture" file
      And translator is ubi
    When I run ParseDomainFileIntoSourceFile
    Then the atribute has type "boolean"

  Scenario: Long boolean attribute
    Given "boolean.fixture" file
      And translator is ubi
    When I run ParseDomainFileIntoSourceFile
    Then the atribute has type "boolean"

  Scenario: Short integer attribute
    Given "int.fixture" file
      And translator is ubi
    When I run ParseDomainFileIntoSourceFile
    Then the atribute has type "integer"

  Scenario: Long integer attribute
    Given "integer.fixture" file
      And translator is ubi
    When I run ParseDomainFileIntoSourceFile
    Then the atribute has type "integer"

  Scenario: Float attribute
    Given "float.fixture" file
      And translator is ubi
    When I run ParseDomainFileIntoSourceFile
    Then the atribute has type "float"

  Scenario: Number attribute
    Given "number.fixture" file
      And translator is ubi
    When I run ParseDomainFileIntoSourceFile
    Then the atribute has type "float"

  Scenario: Decimal attribute
    Given "decimal.fixture" file
      And translator is ubi
    When I run ParseDomainFileIntoSourceFile
    Then the atribute has type "float"

  Scenario: Date attribute
    Given "date.fixture" file
      And translator is ubi
    When I run ParseDomainFileIntoSourceFile
    Then the atribute has type "date"

  Scenario: JSON attribute
    Given "json.fixture" file
      And translator is ubi
    When I run ParseDomainFileIntoSourceFile
    Then the atribute has type "json"

  Scenario: Object attribute
    Given "object.fixture" file
      And translator is ubi
    When I run ParseDomainFileIntoSourceFile
    Then the atribute has type "object"

  Scenario: Shape attribute
    Given "shape.fixture" file
      And translator is ubi
    When I run ParseDomainFileIntoSourceFile
    Then the atribute has type "object"

  Scenario: Entity attribute
    Given "entity.fixture" file
      And translator is ubi
    When I run ParseDomainFileIntoSourceFile
    Then the atribute has type "Person"

  Scenario: Simple array attribute
    Given "simple-array.fixture" file
      And translator is ubi
    When I run ParseDomainFileIntoSourceFile
    Then the atribute has type "[object]"

  Scenario: Typed attribute
    Given "typed-array.fixture" file
      And translator is ubi
    When I run ParseDomainFileIntoSourceFile
    Then the atribute has type "[Person]"
