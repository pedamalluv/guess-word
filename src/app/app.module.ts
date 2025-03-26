import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { DictionaryService } from './services/dictionary.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';  // Import RouterModule


import { DictionaryComponent } from 'src/app/components/dictionary/dictionary.component';
import { LandingPageComponent } from 'src/app/components/landing-page/landing-page.component';
import { AlphabetInputComponent } from 'src/app/components/alphabet-input/alphabet-input.component';
import { VirtualKeyboardComponent } from './components/virtual-keyboard/virtual-keyboard.component';
import { SplitPipe } from './directives/split.pipe';
import { DisableElementPipe } from './directives/disable-element.pipe';
import { GameSettingsComponent } from 'src/app/components/game-settings/game-settings.component';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import { SliderComponent } from 'src/app/shared/slider/slider.component';
import { HeaderComponent } from 'src/app/shared/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    AlphabetInputComponent,
    DictionaryComponent,
    LandingPageComponent,
    VirtualKeyboardComponent,
    SplitPipe,
    DisableElementPipe,
    GameSettingsComponent,
    ModalComponent,
    SliderComponent,
    HeaderComponent,
    
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [DictionaryService],
  bootstrap: [AppComponent]
})
export class AppModule { }

