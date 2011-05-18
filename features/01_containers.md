!SLIDE execute

## Blocks

* A chuck of code enclosed between **{ }** or **do**/**end** keywords
* Similar to the concept of anonymous methods
* Can take parameters
* Can be passed to methods as arguments (at the end, like an extra parameter)
<br/>
    @@@ ruby
    sum = 0
    (1..5).each do |n| # same as [1,2,3,4,5]
      sum += n
    end
    sum
<br/>
    @@@ ruby
    # same thing with { }
    sum = 0
    (1..5).each { |n| sum += n }
    sum
    
!SLIDE execute

## Blocks as Objects

* Can be converted into objects
* Can be stored in variables, pass them around, invoke them whenever you want
* Great for implementing callbacks, dispatch tables, etc
<br/>
    @@@ ruby
    class BlockAsObject
      def store_block(&my_block)
        @stored_block = my_block # converted to Proc
      end
      
      def use_block(parameter)
        @stored_block.call(parameter)
      end
    end
    
    foo = BlockAsObject.new
    foo.store_block { |param| "The block was called with " + param }
    foo.use_block("delay")
    
!SLIDE execute
    
## Blocks as Closures

* They can use local variables from the surrouding scope
<br/>
    @@@ ruby
    def powers_of_2_proc
      value = 1
      lambda { value += value }
    end
    
    powers_of_2 = powers_of_2_proc
    
    powers_of_2.call # 2
    powers_of_2.call # 4
    powers_of_2.call # will return 8!
<br/>

* So, *powers_of_2_proc* returns a *Proc* that references *value*
* When the block is called, *value* is out of scope
* The block is still able to access it (and will be for the remaining life of this block)

!SLIDE

## Iterators

* In many languages, collections implement methods to generate external iterator objects
<br/>
    @@@ cpp
    // C++
    for (std::vector<int>::iterator i=list.begin(); i!=list.end(); i++) {
      // code
    }    
!SLIDE

## Iterators

* In many languages, collections implement methods to generate external iterator objects
<br/>
    @@@ csharp
    // C#
    IEnumerator<int> i = list.GetEnumerator();
    while (i.MoveNext()) {
      // code
    }
    
!SLIDE

## Iterators

* In many languages, collections implement methods to generate external iterator objects
<br/>
    @@@ java
    // Java
    Iterator i = list.iterator();
    while (i.hasNext()) {
      // code
    }
    
!SLIDE

## Iterators

* When coming from other languages, many people iterate collections like this:
<br/>
    @@@ ruby
    # familiar?
    for i in 0..2
      number = array[i][0]
      word   = array[i][1]
      
      puts "#{word}: #{number}"
    end
    
!SLIDE

## Iterators

* However, there's another approach:
<br/>
    @@@ ruby
    # the "ruby way", with a lot less coupling
    array.each do |word, number|
      puts "#{word}: #{number}"
    end
<br/>
* The "Ruby way" is different: an iterator is internal to the collection... it's just a method that calls `yield` every time it generates a new value

!SLIDE execute

## Iterators

* Ruby provides a lot of useful iterators: *each*, *map*, *inject*, etc
* But you can build your own
<br/>
    @@@ ruby
    def fib(max)
      i1, i2 = 1, 1 # parallel assignment
      while i1 <= max
        yield i1
        i1, i2 = i2, i1+i2
      end
    end
    
    result = ""
    fib(1337) { |n| result += "#{n} " }
    result

!SLIDE

## Iterators

* Ruby's internal interators aren't necessarily the best solution
* What if you need the iterator to be an object?
* What if you want to iterate multiple collections simultaneously?

!SLIDE execute

## Enumerators

* When iterators aren't suitable, you can resort to enumerators
* To put it simply, an enumerator is an external iterator
<br/>
    @@@ ruby
    array = ["my", 1337, "array"]
    enumerator = array.to_enum # same as "enumerator = array.each"
    
    enumerator.next # returns "my" and moves to the next element
    enumerator.next
<br/>

!SLIDE

## Enumerators

* Most internal iterators are can be used as enumerators
<br/>
    @@@ ruby
    string = "le fu"
    enumerator = string.each_char
    
    enumerator.next # returns "l" and moves to the next char
    enumerator.next
    
!SLIDE

## Containers, containers, containers!

* Containers, blocks and iterators are core concepts of Ruby
* With practice, you'll start building classes that iterate over their contents instead of using the conventional looping constructs
* It might seem complicated at first, but you'll start using these features naturally
* Easy to read and maintain
