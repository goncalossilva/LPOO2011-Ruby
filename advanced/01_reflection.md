!SLIDE

## Reflection

* Ruby is very powerful when it comes to examining the aspects of a program within itself
* It can discover information about:
  * What objects exist
  * All class hierarchies
  * Attributes and methods of all objects
  * Information about methods
  
> “When you introspect, you think about your thoughts and feelings. This is interesting because you're using thought to analyze thought.” — Dave Thomas

!SLIDE

## Reflection and Objects

* You can transverse all living objects:
<br/>
    @@@ ruby
    ObjectSpace.each_object(Float) { |x| puts x }

!SLIDE execute

## Reflection and Objects

* You can look inside objects:
<br/>
    @@@ ruby
    [1,2,3].methods[0..4]
<br/>
    @@@ ruby
    [1,2,3].respond_to?(:to_s)
<br/>
    @@@ ruby
    [1,2,3].kind_of?(Hash)
<br/>

!SLIDE execute

## Reflection and Objects

* You can invoke any method by name using *send*:
<br/>
    @@@ ruby
    a = [1,2,3]
    a.send(a.private_methods.first.to_sym) # "initialize"
    a # now it's empty!

!SLIDE execute

## Reflection and Objects

* Another way is to use the *Method* class:
<br/>
    @@@ ruby
    a = [1,2,3]
    constructor = a.method(:initialize)
    constructor.call
    a
<br/>
* You get a *Method* object which you can store, pass around and call anytime!

!SLIDE execute

## Reflection and Classes

* It's also possible to look inside classes:
<br/>
    @@@ ruby
    String.ancestors # all superclasses and mixed-in modules

!SLIDE execute

## Reflection and Classes

* It's also possible to look inside classes:
<br/>
    @@@ ruby
    klass = String
    result = klass.to_s
    begin
      klass = klass.superclass
      result += " < " + klass.to_s
    end while klass.superclass
    result

!SLIDE

## Reflection and Classes

* It's also possible to look inside classes:
<br/>
    @@@ ruby
    Fixnum.constants
<br/>
    @@@ ruby
    Fixnum.class_variables
<br/>
    @@@ ruby
    Fixnum.singleton_methods(false)
<br/>
    @@@ ruby
    Fixnum.instance_methods(false) # prefix with private/protected/public

!SLIDE

## Reflection and the Program's Execution

* Ruby let's you look at the interpreter while it executes your code
<br/>
    @@@ ruby
    class Example
      def example
        example = true
      end
    end
    
    set_trace_func lambda { |event, file, line, id, binding, classname|
      printf "%8s %s:%s-2d %-15s\n", event, file, line, classname, id
    }
    
    e = Example.new
    e.example
<br/>
* And you can also get the current call stack by using calling `caller` on your methods

!SLIDE execute

## Reflection and the Program's Execution

* You can even get the current source file being executed with the `__FILE__` special variable, leading to an interesting Quine:
<br/>
    @@@ ruby
    print File.read(__FILE__)
<br/>
* A program that outputs itself!
