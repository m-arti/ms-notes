(* ::Package:: *)

(* MetaInformation *)
(* Author: Martins Samuel *)
(* Description: Wolfram Notebook stylesheet for notes \[LongDash] https://notes.martinssamuel.com *)
(* Homepage: https://notes.martinssamuel.com *)

(* Beginning of Content *)
Notebook[{
Cell[StyleData[StyleDefinitions -> "Default.nb"]],

(* ALL *)
Cell[StyleData[All],
 ShowCellBracket->Automatic],

(* TITLE *)
Cell[StyleData["Title"],
 FontFamily->"Source Sans Pro",
 FontSize->45,
 FontWeight->"SemiBold",
 FontSlant->"Plain",
 FontVariations->{"StrikeThrough"->False, "Underline"->False},
 PrivateFontOptions->{"FontPostScriptName"->"Automatic"},
 FontColor->RGBColor[0., 0., 0.]],

(* SUBTITLE *)
Cell[StyleData["Subtitle"]],

(* SECTION *)
Cell[StyleData["Section"],
 ShowGroupOpener->"Inline",
 FontFamily->"Source Sans Pro",
 FontSize->24,
 FontWeight->"Regular",
 FontSlant->"Plain",
 FontVariations->{"StrikeThrough"->False, "Underline"->False},
 PrivateFontOptions->{"FontPostScriptName"->"Automatic"},
 FontColor->Black],

(* SUBSECTION *)
Cell[StyleData["Subsection"],
 ShowGroupOpener->"Inline",
 FontVariations->{"StrikeThrough"->False, "Underline"->False},
 FontSize->18,
 FontColor->Gray],

(* SUBSUBSECTION *)
Cell[StyleData["Subsubsection"],
 ShowGroupOpener->"Inline",
 FontFamily->Automatic,
 FontSize->18,
 FontWeight->"Regular",
 FontSlant->"Italic",
 FontVariations->{"StrikeThrough"->False, "Underline"->False},
 PrivateFontOptions->{"FontPostScriptName"->"SourceSansPro-LightItalic"},
 FontColor->RGBColor[0., 0., 0.]],

(* TEXT *)
Cell[StyleData["Text"],
 FontFamily->"Source Sans Pro",
 FontSize->15,
 FontWeight->"Regular",
 FontSlant->"Plain",
 FontVariations->{"StrikeThrough"->False, "Underline"->False},
 TextJustification->1.,
 Background->None,
 PrivateFontOptions->{"FontPostScriptName"->"Automatic"}],

(* INPUT *)
Cell[StyleData["Input"],
 FontFamily->"Source Code Pro",
 FontSize->13,
 FontWeight->"Regular",
 FontSlant->"Plain",
 PrivateFontOptions->{"FontPostScriptName"->"Automatic"}]
},

WindowSize->Automatic,
StyleDefinitions->"PrivateStylesheetFormatting.nb"
]
(* End of Content *)
