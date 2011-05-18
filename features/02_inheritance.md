!SLIDE execute

## Inheritance

    @@@ ruby
    class SuperClass
      def hello_world
        "Hello world!"
      end
    end
    
    class SubClass < SuperClass
    end
    
    superclass = SuperClass.new
    subclass   = SubClass.new
    
    "Hello world from the superclass: #{superclass.hello_world}\n" +
    "Hello world from the subclass  : #{subclass.hello_world}"
    
!SLIDE

## Inheritance

* Single inheritance, unlike C++
* Top-level classes are subclasses of *Object*, which is a subclass of *BasicObject*
* Classes have built-in functionality because they inherited it!

!SLIDE

## Modules

    @@@ ruby
    module MyModule # a module has it all
      MY_CONSTANT = "my constant" # constants
      
      def my_method # methods
      end
      
      class MyClass # and classes
      end
    end
    
    namespaced = MyModule::MyClass.new

<br/>

* Modules provide a namespace, avoiding name collisions
* Modules have another wonderful use: *mixins*

!SLIDE

## Mixins and Inheritance

* Some OO languages support multiple inheritance (C++, Lisp, Python, etc)
* This is very powerful, but can be troublesome because of inheritance ambiguity
* Ruby offers a great compromise: the simplicity of single inheritance and the power of multiple inheritance

!SLIDE

## Mixins

<div class="two-column-container">
  <pre class="sh_ruby sh_sourceCode two-column">
  module StringHelpers
    def stringify
      if self.value > 9000
        "Over 9000!"
      else
        "Meh"
      end
    end
  end

  class Number
    attr_reader :value
    
    def initialize(value)
      @value = value
    end
  end
  </pre>
  <pre class="sh_ruby sh_sourceCode two-column">
  class Over9000Number < Number
    include StringHelpers
    
    def initialize(value)
      super(value + 9000)
    end
    
    def status
      "Current status: "+stringify
    end
  end

  number = Over9000Number.new(42)
  number.status 
  # => "Current status: Over 9000!"
  </pre>
</div>

* Inherit from one class, include functionality from multiple modules — *mixins*!

!SLIDE

## Inheritance, Mixins and Design

* Ruby allows you to right code once and inject it into multiple places
* When to use each?
  * Inheritance
    * You should be able to replace a parent object with a child object, honoring its contract
    * A child object *is a* kind of the parent (an apple is a fruit)
    * In the real world, strict hierarchies are restricive... we need composition!
  * Mixins
    * For composition: A *has a* B, or A *uses a* B
    * Exclusively using *mixins* can be messy — both should be combined
    
!SLIDE

## Inheritance, Mixis and Design

* Each of them serves its purpose, our job is to use the appropriately
* This makes no sense:
<br/>
    @@@ ruby
    class Person < DataWrapper
    end
<br/>
* And this makes no sense either:
<br/>
    @@@ ruby
    class Banana
      include FruitProperties
    end
<br/>      
* Think before you typing
