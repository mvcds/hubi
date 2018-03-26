Feature: Parse Domain Files From Pattern
  As a developer
  I want to parse domain files using a glob pattern
  In order to not have to manually parse each one

  Scenario: Happy path
    Given some glob pattern
      And some output folder
    When I run ParseDomainFilesFromPattern
    Then the glob pattern find a domain file
      And the domain file is read
      And the domain file is converted into a source file
      And the source file is saved on output folder
