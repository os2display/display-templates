describe("template spec", () => {
  it("Two split screen template", () => {
    cy.visit("/two-split");
    cy.get(".grid-index")
      .should("exist")
      .should("have.css", "grid-template-areas")
      .should("include", "a b");
    cy.get(".grid-element")
      .eq(0)
      .should("exist")
      .should("have.css", "grid-area")
      .should("include", "a / a / a / a");
    cy.get(".grid-element")
      .eq(1)
      .should("exist")
      .should("have.css", "grid-area")
      .should("include", "b / b / b / b");
  });

  it("Two split vertical screen template", () => {
    cy.visit("/two-split-vertical");
    cy.get(".grid-index")
      .should("exist")
      .should("have.css", "grid-template-areas")
      .should("include", '"a" "b" "c" "d" "e"');

    cy.get(".grid-element")
      .eq(0)
      .should("exist")
      .should("have.css", "grid-area")
      .should("include", "a / a / c / c");
    cy.get(".grid-element")
      .eq(1)
      .should("exist")
      .should("have.css", "grid-area")
      .should("include", "d / d / e / e");
  });

  it("Two split vertical reversed screen template", () => {
    cy.visit("/two-split-vertical-reversed");
    cy.get(".grid-index")
      .should("exist")
      .should("have.css", "grid-template-areas")
      .should("include", '"a" "b" "c" "d" "e"');

    cy.get(".grid-element")
      .eq(0)
      .should("exist")
      .should("have.css", "grid-area")
      .should("include", "a / a / b / b");
    cy.get(".grid-element")
      .eq(1)
      .should("exist")
      .should("have.css", "grid-area")
      .should("include", "c / c / e / e");
  });

  it("Three split screen template", () => {
    cy.visit("/three-split");
    cy.get(".grid-index")
      .should("exist")
      .should("have.css", "grid-template-areas")
      .should("include", '"a b" "c d"');

    cy.get(".grid-element")
      .eq(0)
      .should("exist")
      .should("have.css", "grid-area")
      .should("include", "a / a / c / c");
    cy.get(".grid-element")
      .eq(1)
      .should("exist")
      .should("have.css", "grid-area")
      .should("include", "b / b / b / b");
    cy.get(".grid-element")
      .eq(2)
      .should("exist")
      .should("have.css", "grid-area")
      .should("include", "d / d / d / d");
  });

  it("Three split horizontal screen template", () => {
    cy.visit("/three-split-horizontal");
    cy.get(".grid-index")
      .should("exist")
      .should("have.css", "grid-template-areas")
      .should("include", "a b c");

    cy.get(".grid-element")
      .eq(0)
      .should("exist")
      .should("have.css", "grid-area")
      .should("include", "a / a / a / a");
    cy.get(".grid-element")
      .eq(1)
      .should("exist")
      .should("have.css", "grid-area")
      .should("include", "b / b / b / b");
    cy.get(".grid-element")
      .eq(2)
      .should("exist")
      .should("have.css", "grid-area")
      .should("include", "c / c / c / c");
  });

  it("Six areas screen template", () => {
    cy.visit("/six-areas");
    cy.get(".grid-index")
      .should("exist")
      .should("have.css", "grid-template-areas")
      .should(
        "include",
        '"a b c d" "e f g h" "i j k l" "m n o p" "q r s t" "u v w x" "y z aa bb" "cc dd ee ff" "gg hh ii jj" "kk ll mm nn" "oo pp qq rr" "ss tt uu vv" "ww xx yy zz" "aaa bbb ccc ddd" "eee fff ggg hhh" "iii jjj kkk lll" "mmm nnn ooo ppp" "qqq rrr sss ttt" "uuu vvv www xxx" "yyy zzz aaaa bbbb" "cccc dddd eeee ffff" "gggg hhhh iiii jjjj" "kkkk llll mmmm nnnn" "oooo pppp qqqq rrrr" "ssss tttt uuuu vvvv" "wwww xxxx yyyy zzzz" "aaaaa bbbbb ccccc ddddd" "eeeee fffff ggggg hhhhh" "iiiii jjjjj kkkkk lllll" "mmmmm nnnnn ooooo ppppp" "qqqqq rrrrr sssss ttttt" "uuuuu vvvvv wwwww xxxxx" "yyyyy zzzzz aaaaaa bbbbbb" "cccccc dddddd eeeeee ffffff" "gggggg hhhhhh iiiiii jjjjjj" "kkkkkk llllll mmmmmm nnnnnn" "oooooo pppppp qqqqqq rrrrrr" "ssssss tttttt uuuuuu vvvvvv" "wwwwww xxxxxx yyyyyy zzzzzz" "aaaaaaa bbbbbbb ccccccc ddddddd" "eeeeeee fffffff ggggggg hhhhhhh" "iiiiiii jjjjjjj kkkkkkk lllllll" "mmmmmmm nnnnnnn ooooooo ppppppp" "qqqqqqq rrrrrrr sssssss ttttttt"'
      );

    cy.get(".grid-element")
      .eq(0)
      .should("exist")
      .should("have.css", "grid-area")
      .should("include", "a / a / p / p");
    cy.get(".grid-element")
      .eq(1)
      .should("exist")
      .should("have.css", "grid-area")
      .should("include", "q / q / aaa / aaa");
    cy.get(".grid-element")
      .eq(2)
      .should("exist")
      .should("have.css", "grid-area")
      .should("include", "eee / eee / oooo / oooo");
    cy.get(".grid-element")
      .eq(3)
      .should("exist")
      .should("have.css", "grid-area")
      .should("include", "ssss / ssss / ssssss / ssssss");
    cy.get(".grid-element")
      .eq(4)
      .should("exist")
      .should("have.css", "grid-area")
      .should("include", "wwwwww / wwwwww / ttttttt / ttttttt");
    cy.get(".grid-element")
      .eq(5)
      .should("exist")
      .should("have.css", "grid-area")
      .should("include", "r / r / vvvvvv / vvvvvv");
  });

  it("Touch template screen template", () => {
    cy.visit("/touch-template");
    cy.get(".grid-index")
      .should("exist")
      .should("have.css", "grid-template-areas")
      .should(
        "include",
        '"a b c d" "e f g h" "i j k l" "m n o p" "q r s t" "u v w x" "y z aa bb" "cc dd ee ff" "gg hh ii jj" "kk ll mm nn" "oo pp qq rr" "ss tt uu vv" "ww xx yy zz" "aaa bbb ccc ddd" "eee fff ggg hhh" "iii jjj kkk lll" "mmm nnn ooo ppp" "qqq rrr sss ttt" "uuu vvv www xxx" "yyy zzz aaaa bbbb" "cccc dddd eeee ffff" "gggg hhhh iiii jjjj" "kkkk llll mmmm nnnn" "oooo pppp qqqq rrrr" "ssss tttt uuuu vvvv" "wwww xxxx yyyy zzzz" "aaaaa bbbbb ccccc ddddd" "eeeee fffff ggggg hhhhh" "iiiii jjjjj kkkkk lllll" "mmmmm nnnnn ooooo ppppp" "qqqqq rrrrr sssss ttttt" "uuuuu vvvvv wwwww xxxxx" "yyyyy zzzzz aaaaaa bbbbbb" "cccccc dddddd eeeeee ffffff" "gggggg hhhhhh iiiiii jjjjjj" "kkkkkk llllll mmmmmm nnnnnn" "oooooo pppppp qqqqqq rrrrrr" "ssssss tttttt uuuuuu vvvvvv" "wwwwww xxxxxx yyyyyy zzzzzz" "aaaaaaa bbbbbbb ccccccc ddddddd" "eeeeeee fffffff ggggggg hhhhhhh" "iiiiiii jjjjjjj kkkkkkk lllllll" "mmmmmmm nnnnnnn ooooooo ppppppp" "qqqqqqq rrrrrrr sssssss ttttttt"'
      );

    cy.get(".grid-element")
      .eq(0)
      .should("exist")
      .should("have.css", "grid-area")
      .should("include", "a / a / p / p");
    cy.get(".grid-element")
      .eq(1)
      .should("exist")
      .should("have.css", "grid-area")
      .should("include", "q / q / aaa / aaa");
    cy.get(".grid-element")
      .eq(2)
      .should("exist")
      .should("have.css", "grid-area")
      .should("include", "eee / eee / oooo / oooo");
    cy.get(".grid-element")
      .eq(3)
      .should("exist")
      .should("have.css", "grid-area")
      .should("include", "ssss / ssss / ssssss / ssssss");
    cy.get(".grid-element")
      .eq(4)
      .should("exist")
      .should("have.css", "grid-area")
      .should("include", "wwwwww / wwwwww / ttttttt / ttttttt");
    cy.get(".grid-element")
      .eq(5)
      .should("exist")
      .should("have.css", "grid-area")
      .should("include", "r / r / vvvvvv / vvvvvv");
  });

  it("Full screen screen template", () => {
    cy.visit("/full-screen");
    cy.get(".grid-index")
      .should("exist")
      .should("have.css", "grid-template-areas")
      .should("include", "a");

    cy.get(".grid-element")
      .eq(0)
      .should("exist")
      .should("have.css", "grid-area")
      .should("include", "a / a / a / a");
  });

  it("Four areas screen template", () => {
    cy.visit("/four-areas");
    cy.get(".grid-index")
      .should("exist")
      .should("have.css", "grid-template-areas")
      .should("include", '"a b" "c d"');

    cy.get(".grid-element")
      .eq(0)
      .should("exist")
      .should("have.css", "grid-area")
      .should("include", "a / a / a / a");
    cy.get(".grid-element")
      .eq(1)
      .should("exist")
      .should("have.css", "grid-area")
      .should("include", "b / b / b / b");
    cy.get(".grid-element")
      .eq(2)
      .should("exist")
      .should("have.css", "grid-area")
      .should("include", "c / c / c / c");
    cy.get(".grid-element")
      .eq(3)
      .should("exist")
      .should("have.css", "grid-area")
      .should("include", "d / d / d / d");
  });
});
