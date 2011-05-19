!SLIDE

# Ruby

### An introduction to the Ruby programming language

#### LPOO — MIEIC — FEUP

<time datetime="2011-05-19">May 2011</time>

!SLIDE

## @goncalossilva

!SLIDE

## Ruby

* Created by Yukihiru “Matz” Matsumoto, in Japan
* Perl + SmallTalk + Eiffel + Ada + Lisp = Ruby

> “I wanted a scripting language that was more powerful than Perl, and more object-oriented than Python.” — matz

!SLIDE

## Ruby

* Interpreted language, with many implementations: *YARV*, *Rubinius*, *JRuby*, etc
* Functional, object-oriented, imperative and reflective
* Dynamically typed, with automatic garbage collection, exception handling and built-in unit testing
* Optimized for programmer productivity and happiness

!SLIDE

# Basics

!SLIDE execute

## Methods
    @@@ ruby
    def hello_world
      "Hello world!" # implicit return
    end

    hello_world

!SLIDE execute
    
## Classes
    @@@ ruby
    class HelloWorld
      def say
        "Hello world done right!"
      end
    end
    
    hello_world_object = HelloWorld.new
    hello_world_object.say
