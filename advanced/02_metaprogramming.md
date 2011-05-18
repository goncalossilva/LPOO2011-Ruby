!SLIDE

## Metaprogramming



!SLIDE execute

## Reflection and Hooks

* Ruby allows you to intercept calls to methods:
<br/>
    @@@ ruby
    class Object
      alias_method :old_to_s, :to_s
      def to_s
        result = self.old_to_s
        "Your converted ruby object: "+result
      end
    end
    
    o = Object.new
    o.to_s
