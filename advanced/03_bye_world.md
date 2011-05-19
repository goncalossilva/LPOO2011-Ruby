!SLIDE

# Wrapping Up

!SLIDE

## Ruby

* Ruby is an incredibly powerful language
* Many successful projects/products use it at their core: Ruby on Rails, God, Redmine, etc
* You can add and remove code in a running process, redefine methods on the fly, change their scope
* You can even modify basic types like `String`, `Float` or even `Class` and `Object`
* After using it for a while, you'll notice the lack of flexibility on static languages like C++ or half-static languages like Java

!SLIDE execute

## Ruby

* This presentation, for instance, is running on a Sinatra application
* And most of the shown code was executed in real time
* No? Then check this out:
<br/>
    @@@ ruby
    class Lecture
      def initialize(name = "TBA")
        @name = name
      end
      
      def finish
        "Finished at #{(Time.now.utc+3600).strftime('%H:%M:%S')}!"
      end
    end

    lecture = Lecture.new("Ruby")
    lecture.finish

!SLIDE

## More

* Books:
  * Programming Ruby 1.9 by Dave Thomas
  * Metaprogramming Ruby by Paolo Perrotta
* Mailing lists:
  * Ruby-Talk (subscribe through [Ruby's website](http://www.ruby-lang.org/en/community/mailing-lists/))
  * Ruby-pt (Google Groups)
* IRC:
  * \#ruby and \#ruby-pt on Freenode

!SLIDE

# ?
