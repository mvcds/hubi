Feature: Create Ubiquitous Entity
  As a developer
  I want to create ubiquitous entity
  In order to use them

  Scenario: Create Ubiquitous Entity
    Given the path to a file
    When I run CreateUbiquitousEntity
    Then the file is read
      And the file is loaded
      And the entity is created
