!SLIDE

# Metaprogramming

!SLIDE

## Metaprogramming

* Ruby code can modify aspects of its own structure at runtime and it makes it all easy
* You've seen it before on this presentation: remember `include` and `extend`? Ruby is effectively injecting their code into their receiver

!SLIDE execute

## Singleton Methods

* Ruby lets you define methods specific to a particular object
<br/>
    @@@ ruby
    person = "person" # String object
    def person.say_hi
      "Hi!"
    end
    person.say_hi
<br/>
* Magic? No. Ruby created an anonymous class (often called singleton class) based on `String` and added the method `say_hi` to it

!SLIDE execute

## Singleton Class

* There are other ways of creating methods in an object's singleton class
<br/>
    @@@ ruby
    person = "person"
    class << person
      def say_hi
        "Hi there!"
      end
    end
    person.say_hi
    
!SLIDE execute

## Inherited Visibility

* The visibility of an inherited method can be changed
<br/>
    @@@ ruby
    class SuperClass
      private
        def my_private_method
          "U can't touch this"
        end
    end
    
    class SubClass < SuperClass
      public :my_private_method
    end
    
    object = SubClass.new
    object.my_private_method # not so private anymore
    
!SLIDE

## Inherited Visibility

* What's really happening is that Ruby is inserting a hidden proxy method in the subclass that invokes the original method with `super`
<br/>
    @@@ ruby
    class SubClass < SuperClass
      def my_private_method
        super
      end
      
      public :my_private_method
    end
    
* `super` calls can access the parent's method regardless of its visibility

!SLIDE execute

## Defining Methods

* Ruby allows you to define methods at runtime using `define_method`
<br/>
    @@@ ruby
    class BabyInfo
      ["cry", "eat", "poop"].each do |baby_action|
        define_method(baby_action) do
          "Of course, babies #{baby_action}"
        end
      end
    end
    
    baby_info = BabyInfo.new
    baby_info.cry
* Methods can also be blocked/removed by calling `undef_method` and `remove_method`, respectively
        
!SLIDE

## Class-level Macros

* Ruby has a few class-level macros that generate code behind the scenes
<br/>
    @@@ ruby
    class Laptop
      attr_accessor :memory # injects a getter/setter for "memory"
    end
<br/>
* If you've used Ruby on Rails, you've probably dealt with associations
<br/>
    @@@ ruby on rails
    class Post < ActiveRecord::Base
      has_many :comments
    end

!SLIDE execute

## Eval

* Similarly to other languages, `eval` evaluates the passed Ruby expression(s)
<br/>
    @@@ ruby
    course = "LPOO"
    eval "'Hello ' + course + '!'"

!SLIDE execute

## Instance eval

* `instance_eval` allows you to evaluate Ruby expression(s) in the context of an instance
<br/>
    @@@ ruby
    string = "cool man cool"
    string.instance_eval "def shout; self.upcase; end"
    string.shout
<br/>
* Remember: classes are instances of `Class`, so you can also use `instance_eval` with them:
<br/>
    @@@ ruby
    Fixnum.instance_eval "def ten; 10; end"
    Fixnum.ten
    
!SLIDE execute

## Class eval

* As the name implies, `class_eval` can only be used with classes
* It evaluates the code as if you were in the context of the class definition
<br/>
    @@@ ruby
    String.class_eval do
      def shout
        self.upcase
      end
    end
    string = "cool man cool"
    string.shout
<br/>
* Note: `eval`, `instance_eval` and `class_eval` can take blocks as arguments as shown above
    
!SLIDE execute

## Eval evilness

* `eval` is slow
* `eval` is dangerous
* `eval` doesn't generally make sense, given all other metaprogramming facilities

!SLIDE

## Callbacks

* Ruby provides *hook methods*, called by the interpreter when a specific event occurs
* Among all available *hook methods*—also known as *callbacks*—are:
  * Method-related hooks: `method_added`, `method_missing`, `method_removed`, etc
  * Class/Module-related hooks: `const_missing`, `extended`, `included`, `inherited`, etc
  * Object marshaling and coercion hooks
  
!SLIDE execute

## Callbacks: `method_missing`

* Ruby allows you to act upon calls to undefined methods by using `method missing`
<br/>
    @@@ ruby
    class BabyInfo
      ["cry", "eat", "poop"].each do |baby_action|
        define_method(baby_action) do
          "Of course, babies #{baby_action}"
        end
      end
      
      def method_missing(name, *args, &block)
        "Nope, babies don't #{name}"
      end
    end
    
    baby_info = BabyInfo.new
    baby_info.surf

!SLIDE

## Callbacks: `inherited`

* Ruby allows your classes to act when they're subclassed
<br/>
    @@@ ruby
    class SuperClass
      @children = [] # class variable
      
      def self.inherited(child)
        @children << child
      end
      
      def self.children
        @children
      end
    end

!SLIDE execute

## Callback: method calls

* Ruby allows you to intercept calls to specific methods:
<br/>
    @@@ ruby
    class Object
      alias_method :old_to_s, :to_s
      def to_s
        result = self.old_to_s
        "Your modified to_s returned this (should be '"+result+"')"
      end
    end
    
    object = Object.new
    object.to_s
* This isn't a direct hook: you're copying the original method and inserting a hook by yourself
