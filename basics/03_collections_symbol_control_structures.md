!SLIDE execute

## Arrays

* Store indexed collections of objects accessible through an integer key
* Can contain objects with different classes simultaneously
<br/>
    @@@ ruby
    # array
    a = [1, "second", 3.14]
    a[2]
    
!SLIDE execute

## Hashes

* Store indexed collections of objects accessible through a key which can be any object
* Slightly less efficient but much more flexible
<br/>
    @@@ ruby
    # hash
    h = {
      "string"  => [3,4,5],
      2         => "everything can be a value!",
      [1,2]     => "everything can be a key!"
    }
    h[[1,2]]

!SLIDE

## Symbols

* A significant name, generally a static variable

<br/>

    @@@ java
    // java
    static final int NORTH = 1;
    // ... more code
    move(NORTH);
<br/><br/>
    @@@ ruby
    # ruby
    move(:north)

<br/>
    
* No need to predeclare these constants, they are unique

<br/>

    @@@ ruby
    return true if direction == :north
    
!SLIDE

## Control Structures

    @@@ ruby
    # if
    if score.between?(100, 199)
      puts "You rock!"
    elsif score < 50
      puts "You suck!"
    else
      puts "Meh"
    end

    # while
    while score < 100
      puts "You're almost there! Try again..."
      # ...
    end

    # more goodness with unless, until, case, for, etc
    
    
    # and awesome shortcuts like statement modifiers
    puts "You cheated!" if score >= 200
